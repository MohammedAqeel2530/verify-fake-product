import RoleCard from "@/components/RoleCard";
import WalletConnect from "@/components/WalletConnect";
import { Package, Search, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import QrScanner from "../components/QrScanner";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [qrText, setQrText] = useState<string>("");
  const { isConnected, connectWallet } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Admin Panel Access Button */}
      <div className="absolute top-4 right-4">
        <Button
          onClick={() => navigate("/admin")}
          variant="outline"
          size="sm"
          className="bg-background/10 border-primary/20 text-foreground hover:bg-primary/20"
        >
          <Shield className="w-4 h-4 mr-2" />
          Admin Panel
        </Button>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            VerifyChain
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Blockchain-Powered Product Authentication
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Secure, transparent, and immutable product verification system built on blockchain technology. Choose your role to get started.
          </p>
          
          {/* Wallet Connection */}
          <div className="max-w-md mx-auto mb-12">
            <WalletConnect />
          </div>
        </div>

        <div className="max-w-md mx-auto mt-8">
          <h3 className="text-lg font-medium mb-2">Scan QR</h3>
          {isConnected ? (
            <QrScanner onScan={(t) => setQrText(t)} onError={(e) => console.error(e)} />
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-3">Connect your wallet to enable QR scanning.</p>
              <Button variant="hero" size="sm" onClick={connectWallet}>Connect Wallet</Button>
            </div>
          )}
          {qrText && <p className="mt-4 break-words">Scanned: {qrText}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <RoleCard
            title="Product Owner"
            description="Upload and manage your products for verification"
            features={[
              "Upload product details",
              "Generate QR codes",
              "Track verification status"
            ]}
            icon={Package}
            buttonText="Enter Product Owner"
            onEnter={() => navigate("/product-owner")}
          />

          <RoleCard
            title="Customer"
            description="Search and verify product authenticity"
            features={[
              "Search by Product ID",
              "Scan QR codes",
              "View verification status"
            ]}
            icon={Search}
            buttonText="Enter Customer"
            onEnter={() => navigate("/customer")}
          />
        </div>

        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
            Powered by blockchain technology for maximum security and transparency
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;