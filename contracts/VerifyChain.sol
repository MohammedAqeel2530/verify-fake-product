// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title VerifyChain
 * @dev Smart contract for blockchain-based product authentication and verification
 */
contract VerifyChain {
    
    // Product structure
    struct Product {
        string name;
        string description;
        string manufacturer;
        string batchId;
        string imageHash; // IPFS hash for product image
        address owner;
        uint256 createdAt;
        bool isActive;
        string[] metadata; // Additional product metadata
    }
    
    // Verification record structure
    struct Verification {
        address verifier;
        uint256 timestamp;
        string location; // Optional location data
        bool isAuthentic;
    }
    
    // State variables
    mapping(string => Product) public products; // productId => Product
    mapping(string => Verification[]) public verificationHistory; // productId => Verification[]
    mapping(address => string[]) public ownerProducts; // owner => productId[]
    mapping(address => bool) public authorizedManufacturers;
    
    address public admin;
    uint256 public totalProducts;
    uint256 public totalVerifications;
    
    // Events
    event ProductRegistered(
        string indexed productId,
        address indexed owner,
        string name,
        string manufacturer,
        uint256 timestamp
    );
    
    event ProductVerified(
        string indexed productId,
        address indexed verifier,
        bool isAuthentic,
        uint256 timestamp
    );
    
    event ProductUpdated(
        string indexed productId,
        address indexed owner,
        uint256 timestamp
    );
    
    event ManufacturerAuthorized(
        address indexed manufacturer,
        bool authorized,
        uint256 timestamp
    );
    
    event ProductDeactivated(
        string indexed productId,
        address indexed owner,
        uint256 timestamp
    );
    
    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier onlyProductOwner(string memory productId) {
        require(
            products[productId].owner == msg.sender,
            "Only product owner can perform this action"
        );
        _;
    }
    
    modifier onlyAuthorizedManufacturer() {
        require(
            authorizedManufacturers[msg.sender] || msg.sender == admin,
            "Only authorized manufacturers can register products"
        );
        _;
    }
    
    modifier productExists(string memory productId) {
        require(
            products[productId].owner != address(0),
            "Product does not exist"
        );
        _;
    }
    
    modifier productActive(string memory productId) {
        require(
            products[productId].isActive,
            "Product is not active"
        );
        _;
    }
    
    // Constructor
    constructor() {
        admin = msg.sender;
        authorizedManufacturers[msg.sender] = true;
    }
    
    /**
     * @dev Register a new product
     * @param productId Unique identifier for the product
     * @param name Product name
     * @param description Product description
     * @param manufacturer Manufacturer name
     * @param batchId Batch identifier
     * @param imageHash IPFS hash of product image
     * @param metadata Additional metadata array
     */
    function registerProduct(
        string memory productId,
        string memory name,
        string memory description,
        string memory manufacturer,
        string memory batchId,
        string memory imageHash,
        string[] memory metadata
    ) external onlyAuthorizedManufacturer {
        require(
            products[productId].owner == address(0),
            "Product ID already exists"
        );
        require(bytes(productId).length > 0, "Product ID cannot be empty");
        require(bytes(name).length > 0, "Product name cannot be empty");
        
        products[productId] = Product({
            name: name,
            description: description,
            manufacturer: manufacturer,
            batchId: batchId,
            imageHash: imageHash,
            owner: msg.sender,
            createdAt: block.timestamp,
            isActive: true,
            metadata: metadata
        });
        
        ownerProducts[msg.sender].push(productId);
        totalProducts++;
        
        emit ProductRegistered(
            productId,
            msg.sender,
            name,
            manufacturer,
            block.timestamp
        );
    }
    
    /**
     * @dev Verify a product's authenticity
     * @param productId Product identifier to verify
     * @param location Optional location data
     * @param isAuthentic Whether the product is authentic
     */
    function verifyProduct(
        string memory productId,
        string memory location,
        bool isAuthentic
    ) external productExists(productId) productActive(productId) {
        
        verificationHistory[productId].push(Verification({
            verifier: msg.sender,
            timestamp: block.timestamp,
            location: location,
            isAuthentic: isAuthentic
        }));
        
        totalVerifications++;
        
        emit ProductVerified(
            productId,
            msg.sender,
            isAuthentic,
            block.timestamp
        );
    }
    
    /**
     * @dev Update product information (only owner)
     * @param productId Product identifier
     * @param name New product name
     * @param description New product description
     * @param metadata New metadata array
     */
    function updateProduct(
        string memory productId,
        string memory name,
        string memory description,
        string[] memory metadata
    ) external onlyProductOwner(productId) productExists(productId) {
        require(bytes(name).length > 0, "Product name cannot be empty");
        
        products[productId].name = name;
        products[productId].description = description;
        products[productId].metadata = metadata;
        
        emit ProductUpdated(productId, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Deactivate a product (only owner)
     * @param productId Product identifier to deactivate
     */
    function deactivateProduct(string memory productId) 
        external 
        onlyProductOwner(productId) 
        productExists(productId) 
    {
        products[productId].isActive = false;
        
        emit ProductDeactivated(productId, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Authorize or revoke manufacturer status (only admin)
     * @param manufacturer Manufacturer address
     * @param authorized Authorization status
     */
    function setManufacturerAuthorization(address manufacturer, bool authorized) 
        external 
        onlyAdmin 
    {
        authorizedManufacturers[manufacturer] = authorized;
        
        emit ManufacturerAuthorized(manufacturer, authorized, block.timestamp);
    }
    
    /**
     * @dev Get product details
     * @param productId Product identifier
     * @return Product struct data
     */
    function getProduct(string memory productId) 
        external 
        view 
        productExists(productId)
        returns (
            string memory name,
            string memory description,
            string memory manufacturer,
            string memory batchId,
            string memory imageHash,
            address owner,
            uint256 createdAt,
            bool isActive,
            string[] memory metadata
        )
    {
        Product memory product = products[productId];
        return (
            product.name,
            product.description,
            product.manufacturer,
            product.batchId,
            product.imageHash,
            product.owner,
            product.createdAt,
            product.isActive,
            product.metadata
        );
    }
    
    /**
     * @dev Get verification history for a product
     * @param productId Product identifier
     * @return Array of verification records
     */
    function getVerificationHistory(string memory productId) 
        external 
        view 
        productExists(productId)
        returns (Verification[] memory)
    {
        return verificationHistory[productId];
    }
    
    /**
     * @dev Get products owned by an address
     * @param owner Owner address
     * @return Array of product IDs
     */
    function getOwnerProducts(address owner) 
        external 
        view 
        returns (string[] memory)
    {
        return ownerProducts[owner];
    }
    
    /**
     * @dev Get verification count for a product
     * @param productId Product identifier
     * @return Number of verifications
     */
    function getVerificationCount(string memory productId) 
        external 
        view 
        productExists(productId)
        returns (uint256)
    {
        return verificationHistory[productId].length;
    }
    
    /**
     * @dev Check if a manufacturer is authorized
     * @param manufacturer Manufacturer address
     * @return Authorization status
     */
    function isAuthorizedManufacturer(address manufacturer) 
        external 
        view 
        returns (bool)
    {
        return authorizedManufacturers[manufacturer];
    }
    
    /**
     * @dev Get contract statistics
     * @return totalProducts Total number of registered products
     * @return totalVerifications Total number of verifications
     */
    function getContractStats() 
        external 
        view 
        returns (uint256, uint256)
    {
        return (totalProducts, totalVerifications);
    }
    
    /**
     * @dev Transfer admin rights (only current admin)
     * @param newAdmin New admin address
     */
    function transferAdminRights(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "New admin cannot be zero address");
        admin = newAdmin;
    }
}