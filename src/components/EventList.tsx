
import { useState, useEffect } from 'react';
import EventCard from './EventCard';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    title: 'Cyberpunk Music Festival 2024',
    ticker: 'CYBER'
  },
  {
    id: '2', 
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=400&fit=crop',
    title: 'Stellar Tech Conference',
    ticker: 'TECH'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=400&fit=crop',
    title: 'Ocean Waves Beach Party',
    ticker: 'WAVE'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop',
    title: 'Forest Zen Retreat',
    ticker: 'ZEN'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=400&fit=crop',
    title: 'Cultural Heritage Festival',
    ticker: 'CULT'
  }
];

interface EventListProps {
  onEventSelect: (eventId: string) => void;
}

const EventList = ({ onEventSelect }: EventListProps) => {
  const [events, setEvents] = useState(mockEvents);

  const handleViewDetails = (eventId: string) => {
    onEventSelect(eventId);
  };

  const handleTrade = (ticker: string) => {
    // Simulate opening Zora trading interface
    console.log(`Opening Zora trading for $${ticker}`);
    // In real implementation, this would open Zora's trading widget
    window.open(`https://zora.co/collect/base:${ticker}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-electric-blue to-neon-green bg-clip-text text-transparent">
          Discover Events
        </h2>
        <p className="text-gray-400">
          Trade, collect, and unlock exclusive experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div 
            key={event.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <EventCard
              {...event}
              onViewDetails={handleViewDetails}
              onTrade={handleTrade}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
