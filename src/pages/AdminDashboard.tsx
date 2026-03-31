import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, XCircle, Clock, Package, Users, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [verifications, setVerifications] = useState([
    {
      id: "PROD-001",
      name: "Luxury Watch Series X",
      description: "Premium Swiss-made luxury watch with automatic movement",
      company: "TimeCorps Inc.",
      manufacturer: "TimeCorps Manufacturing",
      batchId: "BATCH-2024-001",
      imageHash: "QmX1a2b3c4d5e6f7g8h9i",
      submittedDate: "2024-01-15",
      status: "pending",
      price: "$12,999",
      quantity: 500,
      certifications: ["ISO 9001", "Swiss Made"],
      metadata: ["water-resistant-300m", "sapphire-crystal", "automatic-movement"]
    },
    {
      id: "PROD-002", 
      name: "Premium Headphones Pro",
      description: "Noise-cancelling wireless headphones with premium sound quality",
      company: "AudioTech Ltd.",
      manufacturer: "AudioTech Innovations",
      batchId: "BATCH-2024-002",
      imageHash: "QmY9h8g7f6e5d4c3b2a1",
      submittedDate: "2024-01-14",
      status: "pending",
      price: "$599",
      quantity: 2000,
      certifications: ["CE", "FCC"],
      metadata: ["active-noise-cancellation", "bluetooth-5.0", "40-hour-battery"]
    },
    {
      id: "PROD-003",
      name: "Designer Handbag Elite",
      description: "Genuine leather luxury handbag with premium craftsmanship",
      company: "Fashion House Co.",
      manufacturer: "Fashion House Atelier",
      batchId: "BATCH-2024-003",
      imageHash: "QmZ8i7h6g5f4e3d2c1b0",
      submittedDate: "2024-01-13",
      status: "pending",
      price: "$3,499",
      quantity: 150,
      certifications: ["Authentic", "Luxury Grade"],
      metadata: ["genuine-leather", "handcrafted", "limited-edition"]
    }
  ]);
  
  const [selectedDetails, setSelectedDetails] = useState<any>(null);

  const handleVerify = async (productId: string) => {
    try {
      // Update local state
      setVerifications(prev =>
        prev.map(item =>
          item.id === productId
            ? { ...item, status: "verified" }
            : item
        )
      );
      alert(`✅ Product ${productId} verified successfully!`);
    } catch (err) {
      console.error("Verification failed:", err);
      alert("❌ Verification failed - check console for details");
    }
  };

  const handleReject = async (productId: string) => {
    try {
      // Update local state
      setVerifications(prev =>
        prev.map(item =>
          item.id === productId
            ? { ...item, status: "rejected" }
            : item
        )
      );
      alert(`❌ Product ${productId} rejected.`);
    } catch (err) {
      console.error("Rejection failed:", err);
      alert("❌ Rejection failed - check console for details");
    }
  };

  const handleViewDetails = (item: any) => {
    setSelectedDetails(item);
  };

  const pendingVerifications = verifications.filter(v => v.status === "pending");

  const stats = [
    { label: "Total Products", value: "1,247", icon: Package, color: "text-blue-400" },
    { label: "Verified", value: "892", icon: CheckCircle, color: "text-green-400" },
    { label: "Pending", value: "23", icon: Clock, color: "text-yellow-400" },
    { label: "Active Users", value: "156", icon: Users, color: "text-purple-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="bg-gradient-card border-b border-primary/20 shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-cyber">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/admin")}
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">VerifyChain Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage product verifications and monitor system activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-gradient-card border border-primary/20 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Pending Verifications */}
        <Card className="bg-gradient-card border border-primary/20 shadow-card">
          <div className="p-6 border-b border-primary/20">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Pending Verifications</h3>
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                {pendingVerifications.length} Pending
              </Badge>
            </div>
          </div>
          
          <div className="divide-y divide-primary/10">
            {pendingVerifications.map((item) => (
              <div key={item.id} className="p-6 hover:bg-secondary/20 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {item.id}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Submitted: {item.submittedDate}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="cyber" 
                    size="sm"
                    onClick={() => handleVerify(item.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleReject(item.id)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(item)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* All Products Section */}
        <Card className="mt-8 bg-gradient-card border border-primary/20 shadow-card">
          <div className="p-6 border-b border-primary/20">
            <h3 className="text-xl font-semibold text-foreground">All Products ({verifications.length})</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {verifications.map((item) => (
              <Card key={item.id} className="bg-gradient-card border border-primary/20 hover:border-primary/50 transition-all cursor-pointer" onClick={() => handleViewDetails(item)}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {item.id}
                    </Badge>
                    <Badge 
                      className={
                        item.status === "pending" 
                          ? "bg-yellow-500/20 text-yellow-400" 
                          : item.status === "verified"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </div>

                  <h4 className="text-lg font-semibold text-foreground mb-2">{item.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

                  <div className="space-y-2 text-xs text-muted-foreground mb-4">
                    <p><span className="font-semibold">Company:</span> {item.company}</p>
                    <p><span className="font-semibold">Manufacturer:</span> {item.manufacturer}</p>
                    <p><span className="font-semibold">Price:</span> <span className="text-green-400">{item.price}</span></p>
                    <p><span className="font-semibold">Quantity:</span> {item.quantity} units</p>
                    <p><span className="font-semibold">Batch ID:</span> {item.batchId}</p>
                  </div>

                  <div className="mb-4 pb-4 border-b border-primary/10">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Certifications:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.metadata.map((meta, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-primary/10 text-foreground">
                          {meta}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">
                    🗓️ Submitted: {item.submittedDate}
                  </p>

                  <div className="flex space-x-2">
                    <Button 
                      variant="cyber" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVerify(item.id);
                      }}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verify
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(item.id);
                      }}
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
        {selectedDetails && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <Card className="w-full max-w-2xl bg-gradient-card border border-primary/20 my-8">
              <div className="max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-primary/20 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">Product Details</h3>
                  <button
                    onClick={() => setSelectedDetails(null)}
                    className="text-muted-foreground hover:text-foreground text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold">Product ID</p>
                      <Badge className="bg-primary/20 text-primary border-primary/30 mt-1">
                        {selectedDetails.id}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold">Status</p>
                      <Badge className={selectedDetails.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : selectedDetails.status === "verified" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"} style={{marginTop: '0.25rem'}}>
                        {selectedDetails.status.charAt(0).toUpperCase() + selectedDetails.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* Product Name & Description */}
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Product Name</p>
                    <p className="text-lg font-semibold text-foreground">{selectedDetails.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Description</p>
                    <p className="text-sm text-foreground">{selectedDetails.description}</p>
                  </div>

                  {/* Company & Manufacturer */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold mb-1">Company</p>
                      <p className="text-foreground">{selectedDetails.company}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold mb-1">Manufacturer</p>
                      <p className="text-foreground">{selectedDetails.manufacturer}</p>
                    </div>
                  </div>

                  {/* Batch & Hash */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold mb-1">Batch ID</p>
                      <p className="text-sm text-foreground font-mono">{selectedDetails.batchId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold mb-1">Image Hash</p>
                      <p className="text-sm text-foreground font-mono">{selectedDetails.imageHash}</p>
                    </div>
                  </div>

                  {/* Price & Quantity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold mb-1">Price</p>
                      <p className="text-sm font-semibold text-green-400">{selectedDetails.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold mb-1">Quantity</p>
                      <p className="text-sm text-foreground">{selectedDetails.quantity} units</p>
                    </div>
                  </div>

                  {/* Submitted Date */}
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Submitted Date</p>
                    <p className="text-sm text-foreground">🗓️ {selectedDetails.submittedDate}</p>
                  </div>

                  {/* Certifications */}
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold mb-2">Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDetails.certifications?.map((cert: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                          ✓ {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features/Metadata */}
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold mb-2">Features & Specifications</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDetails.metadata?.map((meta: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="bg-primary/10 text-foreground">
                          📌 {meta}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-primary/20">
                    <Button 
                      variant="cyber" 
                      className="w-full"
                      onClick={() => {
                        handleVerify(selectedDetails.id);
                        setSelectedDetails(null);
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => {
                        handleReject(selectedDetails.id);
                        setSelectedDetails(null);
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedDetails(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;