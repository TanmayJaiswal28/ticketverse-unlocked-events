
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Ticket, Wallet } from 'lucide-react';

interface EventDetailsProps {
  eventId: string;
  onBack: () => void;
}

// Mock event data
const mockEventDetails = {
  '1': {
    id: '1',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop',
    title: 'Cyberpunk Music Festival 2024',
    ticker: 'CYBER',
    description: 'Experience the future of music with cutting-edge electronic artists, holographic performances, and immersive digital art installations.',
    date: 'March 15, 2024',
    location: 'Neo Tokyo Arena',
    price: '0.1 ETH'
  }
};

const EventDetails = ({ eventId, onBack }: EventDetailsProps) => {
  const [hasTicket, setHasTicket] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // Mock connection state
  
  const event = mockEventDetails[eventId as keyof typeof mockEventDetails];

  useEffect(() => {
    // Simulate checking wallet balance for the event coin
    // In real implementation, this would use Zora Coins SDK
    const checkTicketOwnership = async () => {
      // Mock API call
      const mockOwnership = Math.random() > 0.5; // 50% chance of owning ticket
      setHasTicket(mockOwnership);
    };

    if (isConnected) {
      checkTicketOwnership();
    }
  }, [eventId, isConnected]);

  if (!event) {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-400">Event not found</p>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const handleTrade = () => {
    console.log(`Opening Zora trading for $${event.ticker}`);
    // In real implementation, this would open Zora's trading widget
    window.open(`https://zora.co/collect/base:${event.ticker}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button 
        onClick={onBack} 
        variant="outline" 
        className="glass-card border-white/20 hover:border-electric-blue/50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Events
      </Button>

      {/* Event Header */}
      <Card className="glass-card border-white/20">
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-64 md:h-96 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent rounded-t-lg" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {event.title}
                  </h1>
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30 text-lg px-3 py-1">
                    ${event.ticker}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-electric-blue">About This Event</h3>
              <p className="text-gray-300 leading-relaxed">{event.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <h4 className="font-semibold text-white">Date</h4>
                  <p className="text-gray-400">{event.date}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-gray-400">{event.location}</p>
                </div>
              </div>

              <Button 
                onClick={handleTrade}
                className="w-full bg-gradient-electric hover:opacity-90 transition-all duration-300 electric-glow"
              >
                Trade on Zora
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Ticket Ownership Status */}
        <div className="space-y-6">
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold flex items-center space-x-2">
                <Ticket className="w-5 h-5 text-neon-green" />
                <span>🎟️ Ticket Status</span>
              </h3>
              
              {!isConnected ? (
                <div className="text-center space-y-3">
                  <Wallet className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-gray-400">Connect your wallet to check ticket ownership</p>
                  <Button className="w-full bg-gradient-electric">
                    Connect Wallet
                  </Button>
                </div>
              ) : hasTicket ? (
                <div className="text-center space-y-3 p-4 bg-neon-green/10 rounded-lg border border-neon-green/30">
                  <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto">
                    <Ticket className="w-6 h-6 text-neon-green" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-neon-green font-semibold">✅ You own this ticket!</p>
                    <p className="text-sm text-gray-300">Enjoy the event! 🎉</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Ticket className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-red-400 font-semibold">❌ No ticket found</p>
                      <p className="text-sm text-gray-300">Buy a ticket to access this event!</p>
                    </div>
                    <Button 
                      onClick={handleTrade}
                      className="w-full bg-gradient-neon hover:opacity-90 text-space-black font-semibold"
                    >
                      Buy Ticket Now
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Price Info */}
          <Card className="glass-card border-white/20">
            <CardContent className="p-6">
              <h4 className="font-semibold text-white mb-2">Current Price</h4>
              <p className="text-2xl font-bold text-electric-blue">{event.price}</p>
              <p className="text-sm text-gray-400 mt-1">Price may vary on Zora</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
