import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  thumbnail?: string;
  gradient?: "purple" | "cyan";
}

const ToolCard = ({ title, description, icon: Icon, href, thumbnail, gradient = "purple" }: ToolCardProps) => {
  return (
    <Link to={href}>
      <Card className="group h-full overflow-hidden bg-gradient-card border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2">
        <div className="p-6 space-y-4">
          <div className={`w-full aspect-video rounded-lg bg-gradient-${gradient} flex items-center justify-center overflow-hidden relative`}>
            {thumbnail ? (
              <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
            ) : (
              <Icon className="w-16 h-16 text-white/90" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`p-2 bg-gradient-${gradient} rounded-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ToolCard;
