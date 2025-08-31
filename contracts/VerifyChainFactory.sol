// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./VerifyChain.sol";

/**
 * @title VerifyChainFactory
 * @dev Factory contract for deploying VerifyChain instances for different organizations
 */
contract VerifyChainFactory {
    
    struct DeployedContract {
        address contractAddress;
        address deployer;
        string organizationName;
        uint256 deployedAt;
        bool isActive;
    }
    
    mapping(address => DeployedContract[]) public deployerContracts;
    mapping(string => address) public organizationContracts; // orgName => contract address
    DeployedContract[] public allContracts;
    
    address public factoryOwner;
    uint256 public deploymentFee;
    uint256 public totalDeployed;
    
    event ContractDeployed(
        address indexed contractAddress,
        address indexed deployer,
        string organizationName,
        uint256 timestamp
    );
    
    event DeploymentFeeUpdated(
        uint256 oldFee,
        uint256 newFee,
        uint256 timestamp
    );
    
    modifier onlyFactoryOwner() {
        require(msg.sender == factoryOwner, "Only factory owner can perform this action");
        _;
    }
    
    constructor(uint256 _deploymentFee) {
        factoryOwner = msg.sender;
        deploymentFee = _deploymentFee;
    }
    
    /**
     * @dev Deploy a new VerifyChain contract for an organization
     * @param organizationName Unique name for the organization
     */
    function deployVerifyChain(string memory organizationName) 
        external 
        payable 
        returns (address)
    {
        require(msg.value >= deploymentFee, "Insufficient deployment fee");
        require(bytes(organizationName).length > 0, "Organization name cannot be empty");
        require(
            organizationContracts[organizationName] == address(0),
            "Organization name already taken"
        );
        
        // Deploy new VerifyChain contract
        VerifyChain newContract = new VerifyChain();
        address contractAddress = address(newContract);
        
        // Transfer ownership to deployer
        newContract.transferAdminRights(msg.sender);
        
        // Store deployment information
        DeployedContract memory deployment = DeployedContract({
            contractAddress: contractAddress,
            deployer: msg.sender,
            organizationName: organizationName,
            deployedAt: block.timestamp,
            isActive: true
        });
        
        deployerContracts[msg.sender].push(deployment);
        organizationContracts[organizationName] = contractAddress;
        allContracts.push(deployment);
        totalDeployed++;
        
        emit ContractDeployed(
            contractAddress,
            msg.sender,
            organizationName,
            block.timestamp
        );
        
        return contractAddress;
    }
    
    /**
     * @dev Get contracts deployed by a specific address
     * @param deployer Deployer address
     * @return Array of deployed contracts
     */
    function getDeployerContracts(address deployer) 
        external 
        view 
        returns (DeployedContract[] memory)
    {
        return deployerContracts[deployer];
    }
    
    /**
     * @dev Get contract address by organization name
     * @param organizationName Organization name
     * @return Contract address
     */
    function getOrganizationContract(string memory organizationName) 
        external 
        view 
        returns (address)
    {
        return organizationContracts[organizationName];
    }
    
    /**
     * @dev Get all deployed contracts
     * @return Array of all deployed contracts
     */
    function getAllContracts() 
        external 
        view 
        returns (DeployedContract[] memory)
    {
        return allContracts;
    }
    
    /**
     * @dev Update deployment fee (only factory owner)
     * @param newFee New deployment fee
     */
    function updateDeploymentFee(uint256 newFee) external onlyFactoryOwner {
        uint256 oldFee = deploymentFee;
        deploymentFee = newFee;
        
        emit DeploymentFeeUpdated(oldFee, newFee, block.timestamp);
    }
    
    /**
     * @dev Withdraw collected fees (only factory owner)
     */
    function withdrawFees() external onlyFactoryOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = payable(factoryOwner).call{value: balance}("");
        require(success, "Fee withdrawal failed");
    }
    
    /**
     * @dev Transfer factory ownership (only current owner)
     * @param newOwner New factory owner address
     */
    function transferFactoryOwnership(address newOwner) external onlyFactoryOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        factoryOwner = newOwner;
    }
}