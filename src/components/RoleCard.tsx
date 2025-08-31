import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  buttonText: string;
  onEnter: () => void;
}

const RoleCard = ({ title, description, features, icon: Icon, buttonText, onEnter }: RoleCardProps) => {
  return (
    <Card className="p-8 bg-gradient-card border border-primary/20 shadow-card hover:shadow-cyber transition-all duration-300 transform hover:scale-105 animate-float">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-lg flex items-center justify-center shadow-cyber">
          <Icon className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <ul className="space-y-2 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-cyber-pulse"></div>
              {feature}
            </li>
          ))}
        </ul>
        
        <Button variant="hero" size="lg" onClick={onEnter} className="w-full">
          {buttonText}
          <div className="ml-2">→</div>
        </Button>
      </div>
    </Card>
  );
};

export default RoleCard;