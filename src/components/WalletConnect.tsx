import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWallet } from "@/hooks/useWallet";
import { Wallet, ChevronDown, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WalletConnect = () => {
  const { account, isConnected, isLoading, error, connectWallet, disconnectWallet, chainId } = useWallet();
  const { toast } = useToast();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const viewOnExplorer = () => {
    if (account) {
      const baseUrl = chainId === "1" ? "https://etherscan.io" : "https://sepolia.etherscan.io";
      window.open(`${baseUrl}/address/${account}`, '_blank');
    }
  };

  const getNetworkName = (chainId: string | null) => {
    switch (chainId) {
      case "1": return "Ethereum Mainnet";
      case "11155111": return "Sepolia Testnet";
      case "137": return "Polygon";
      default: return "Unknown Network";
    }
  };

  if (!isConnected) {
    return (
      <Card className="p-6 bg-gradient-card border border-primary/20 shadow-card">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-lg flex items-center justify-center shadow-cyber">
            <Wallet className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Connect Wallet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your wallet to interact with the blockchain
            </p>
          </div>
          
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          
          <Button 
            onClick={connectWallet}
            disabled={isLoading}
            variant="hero"
            size="lg"
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mr-2" />
                Connecting...
              </div>
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Connect MetaMask
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gradient-card border border-primary/20 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-cyber">
            <Wallet className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">{formatAddress(account!)}</p>
            <p className="text-xs text-muted-foreground">{getNetworkName(chainId)}</p>
          </div>
        </div>
        
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={copyAddress}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Address
            </DropdownMenuItem>
            <DropdownMenuItem onClick={viewOnExplorer}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={disconnectWallet} className="text-destructive">
              <Wallet className="w-4 h-4 mr-2" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default WalletConnect;