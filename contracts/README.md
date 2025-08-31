# VerifyChain Smart Contracts

This directory contains the Solidity smart contracts for the VerifyChain blockchain product authentication system.

## Contracts

### VerifyChain.sol
The main contract that handles product authentication and verification:

**Key Features:**
- Product registration by authorized manufacturers
- Product verification by any user
- Immutable product data storage
- Verification history tracking
- Manufacturer authorization system
- Product lifecycle management

**Main Functions:**
- `registerProduct()` - Register a new product with metadata
- `verifyProduct()` - Verify a product's authenticity
- `updateProduct()` - Update product information (owner only)
- `deactivateProduct()` - Deactivate a product (owner only)
- `getProduct()` - Retrieve product details
- `getVerificationHistory()` - Get all verifications for a product

### VerifyChainFactory.sol
Factory contract for deploying VerifyChain instances for different organizations:

**Key Features:**
- Deploy separate VerifyChain instances for each organization
- Fee-based deployment system
- Organization name registration
- Contract management and tracking

**Main Functions:**
- `deployVerifyChain()` - Deploy a new VerifyChain contract
- `getDeployerContracts()` - Get contracts deployed by an address
- `getOrganizationContract()` - Get contract by organization name

## Data Structures

### Product
```solidity
struct Product {
    string name;           // Product name
    string description;    // Product description
    string manufacturer;   // Manufacturer name
    string batchId;        // Batch identifier
    string imageHash;      // IPFS hash for product image
    address owner;         // Product owner address
    uint256 createdAt;     // Creation timestamp
    bool isActive;         // Product status
    string[] metadata;     // Additional metadata
}
```

### Verification
```solidity
struct Verification {
    address verifier;      // Address that performed verification
    uint256 timestamp;     // Verification timestamp
    string location;       // Optional location data
    bool isAuthentic;      // Authenticity result
}
```

## Events

The contracts emit events for transparency and off-chain tracking:

- `ProductRegistered` - When a new product is registered
- `ProductVerified` - When a product is verified
- `ProductUpdated` - When product information is updated
- `ManufacturerAuthorized` - When manufacturer status changes
- `ProductDeactivated` - When a product is deactivated
- `ContractDeployed` - When a new VerifyChain contract is deployed

## Security Features

1. **Access Control**: Role-based permissions for different operations
2. **Input Validation**: Comprehensive validation of all inputs
3. **Immutable Records**: Verification history cannot be modified
4. **Authorized Manufacturers**: Only authorized addresses can register products
5. **Product Ownership**: Only owners can modify their products

## Integration Guide

### Frontend Integration

1. **Connect to deployed contract**:
```javascript
const contract = new ethers.Contract(contractAddress, abi, signer);
```

2. **Register a product**:
```javascript
await contract.registerProduct(
    productId,
    name,
    description,
    manufacturer,
    batchId,
    imageHash,
    metadata
);
```

3. **Verify a product**:
```javascript
await contract.verifyProduct(productId, location, isAuthentic);
```

4. **Get product details**:
```javascript
const product = await contract.getProduct(productId);
```

## Deployment

1. Deploy `VerifyChainFactory` contract first
2. Use factory to deploy individual `VerifyChain` contracts for organizations
3. Set appropriate deployment fees and authorize manufacturers

## Gas Optimization

The contracts are optimized for gas efficiency:
- Efficient data structures
- Minimal storage operations
- Batch operations where possible
- Event-based data retrieval

## Testing

Comprehensive test suite should cover:
- Product registration and validation
- Verification workflows
- Access control mechanisms
- Edge cases and error handling
- Gas usage optimization

## Upgradability

Current contracts are not upgradeable by design for immutability. For upgradeable versions, consider implementing proxy patterns in future iterations.