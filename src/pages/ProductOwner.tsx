import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { finalABI, CONTRACT_CONFIG } from "../contractABI";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, QrCode, TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QrCodeGenerator from "../components/QrCodeGenerator";
// Add this function after your imports and before your component definitions
const getContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_CONFIG.contractAddress, finalABI, signer);
};

const ProductOwner = () => {
  const navigate = useNavigate();

  // --- State for wallet + contract ---
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  // --- State for product form ---
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");

  // --- State for blockchain data ---
  const [products, setProducts] = useState<any[]>([]);

  // --- Connect Wallet ---
  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const accountAddress = accounts[0];
        setAccount(accountAddress);

        
        const contractInstance = await getContract();
setContract(contractInstance);

        console.log("Wallet connected:", accountAddress);
      } catch (err) {
        console.error("Connection failed:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // --- Upload Product ---
  const uploadProduct = async () => {
    if (!contract) {
      alert("Please connect your wallet first!");
      return;
    }
    if (!productName || !productDesc) {
      alert("Please fill in product details!");
      return;
    }

    try {
      // ABI expects: (productId, name, description, manufacturer, batchId, imageHash, metadata[])
      const productId = `PROD-${Date.now()}`;
      const manufacturer = account ?? "";
      const batchId = "";
      const imageHash = "";
      const metadata: string[] = [];

      const tx = await contract.createProduct(
        productId,
        productName,
        productDesc,
        manufacturer,
        batchId,
        imageHash,
        metadata
      );
      await tx.wait();
      alert("✅ Product uploaded to blockchain!");
      setProductName("");
      setProductDesc("");
      fetchProducts(); // refresh list
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Upload failed - check console for details");
    }
  };

  // --- Fetch Products ---
  const fetchProducts = async () => {
    if (!contract) return;
    try {
      const productList = await contract.getAllProducts();
      setProducts(productList);
    } catch (err) {
      console.error("Fetching products failed:", err);
    }
  };

  // Auto fetch when contract is ready
  useEffect(() => {
    if (contract) {
      fetchProducts();
    }
  }, [contract]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Product Owner Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your products and track their verification status
          </p>

          {/* Wallet Connection */}
          <div className="mt-4">
            {account ? (
              <p className="text-green-500 font-semibold">
                ✅ Connected: {account}
              </p>
            ) : (
              <Button variant="cyber" onClick={connectWallet}>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card border border-primary/20 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold text-foreground">
                  {products.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border border-primary/20 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <QrCode className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">QR Codes Generated</p>
                <p className="text-2xl font-bold text-foreground">0</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border border-primary/20 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verifications</p>
                <p className="text-2xl font-bold text-foreground">0</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-card border border-primary/20 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Upload New Product
            </h3>
            <p className="text-muted-foreground mb-6">
              Add a new product to the blockchain verification system
            </p>

            {/* Form Inputs */}
            <input
              type="text"
              placeholder="Product Name"
              className="w-full p-2 mb-3 rounded border"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <textarea
              placeholder="Product Description"
              className="w-full p-2 mb-3 rounded border"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
            />

            <Button
              variant="cyber"
              size="lg"
              className="w-full"
              onClick={uploadProduct}
            >
              <Package className="w-5 h-5 mr-2" />
              Upload Product
            </Button>
          </Card>

          <Card className="p-8 bg-gradient-card border border-primary/20 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Generate QR Codes
            </h3>
            <p className="text-muted-foreground mb-6">
              Create QR codes for your verified products
            </p>
            <QrCodeGenerator />
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-card border border-primary/20 shadow-card">
          <div className="p-6 border-b border-primary/20">
            <h3 className="text-xl font-semibold text-foreground">
              Recent Products
            </h3>
          </div>
          <div className="p-6">
            {products.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No products uploaded yet. Upload your first product to get started!
              </p>
            ) : (
              <ul className="space-y-3">
                {products.map((p: any, idx: number) => (
                  <li
                    key={idx}
                    className="p-4 rounded bg-white/5 border border-primary/20"
                  >
                    <p className="font-semibold text-lg">{p.name}</p>
                    <p className="text-muted-foreground">{p.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductOwner;
