
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  id: string;
  image: string;
  title: string;
  ticker: string;
  onViewDetails: (id: string) => void;
  onTrade: (ticker: string) => void;
}

const EventCard = ({ id, image, title, ticker, onViewDetails, onTrade }: EventCardProps) => {
  return (
    <Card className="glass-card border-white/10 hover:border-electric-blue/30 transition-all duration-500 transform hover:scale-105 group cursor-pointer">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <Badge className="absolute top-3 right-3 bg-neon-green/20 text-neon-green border-neon-green/30">
            ${ticker}
          </Badge>
        </div>
        
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-lg text-white group-hover:text-electric-blue transition-colors duration-300">
            {title}
          </h3>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(id)}
              className="flex-1 glass-card border-white/20 hover:border-electric-blue/50 text-white hover:text-electric-blue transition-all duration-300"
            >
              View Details
            </Button>
            
            <Button 
              size="sm" 
              onClick={() => onTrade(ticker)}
              className="flex-1 bg-gradient-electric hover:opacity-90 transition-all duration-300 electric-glow"
            >
              🎯 Trade
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
