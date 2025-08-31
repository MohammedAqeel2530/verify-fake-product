import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, QrCode, ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleVerify = () => {
    // Demo verification result
    if (productId.trim()) {
      setVerificationResult({
        id: productId,
        name: "Luxury Watch Series X",
        company: "TimeCorps Inc.",
        status: "verified",
        verifiedDate: "2024-01-15",
        blockchain: "0x1234...5678"
      });
    }
  };

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
            Product Verification
          </h1>
          <p className="text-muted-foreground">
            Verify product authenticity using blockchain technology
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="p-8 bg-gradient-card border border-primary/20 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Verify Product</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productId">Product ID</Label>
                <Input
                  id="productId"
                  type="text"
                  placeholder="Enter Product ID (e.g., PROD-001)"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="bg-secondary border-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  variant="cyber" 
                  size="lg" 
                  onClick={handleVerify}
                  disabled={!productId.trim()}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Verify Product
                </Button>
                
                <Button variant="hero" size="lg">
                  <QrCode className="w-5 h-5 mr-2" />
                  Scan QR Code
                </Button>
              </div>
            </div>
          </Card>

          {verificationResult && (
            <Card className="p-8 bg-gradient-card border border-green-500/20 shadow-cyber">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">Product Verified!</h3>
                <p className="text-muted-foreground">This product is authentic and verified on the blockchain</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Product ID</p>
                    <p className="font-semibold text-foreground">{verificationResult.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-semibold text-foreground">{verificationResult.company}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Product Name</p>
                  <p className="font-semibold text-foreground">{verificationResult.name}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Verified Date</p>
                    <p className="font-semibold text-foreground">{verificationResult.verifiedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Blockchain Hash</p>
                    <p className="font-mono text-sm text-primary">{verificationResult.blockchain}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center pt-4">
                  <div className="flex items-center space-x-2 text-green-400">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Secured by blockchain technology</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-8 bg-gradient-card border border-primary/20 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">How It Works</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">1</div>
                <div>
                  <p className="font-medium text-foreground">Enter Product ID</p>
                  <p className="text-sm text-muted-foreground">Input the unique product identifier or scan the QR code</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">2</div>
                <div>
                  <p className="font-medium text-foreground">Blockchain Verification</p>
                  <p className="text-sm text-muted-foreground">System checks the product against immutable blockchain records</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">3</div>
                <div>
                  <p className="font-medium text-foreground">Instant Results</p>
                  <p className="text-sm text-muted-foreground">Get immediate verification status and product details</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Customer;