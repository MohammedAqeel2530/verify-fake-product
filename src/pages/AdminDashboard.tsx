import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, XCircle, Clock, Package, Users, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const pendingVerifications = [
    {
      id: "PROD-001",
      name: "Luxury Watch Series X",
      company: "TimeCorps Inc.",
      submittedDate: "2024-01-15",
      status: "pending"
    },
    {
      id: "PROD-002", 
      name: "Premium Headphones Pro",
      company: "AudioTech Ltd.",
      submittedDate: "2024-01-14",
      status: "pending"
    },
    {
      id: "PROD-003",
      name: "Designer Handbag Elite",
      company: "Fashion House Co.",
      submittedDate: "2024-01-13",
      status: "pending"
    }
  ];

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
                  <Button variant="cyber" size="sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify
                  </Button>
                  <Button variant="destructive" size="sm">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;