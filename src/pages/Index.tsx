
import { useState } from 'react';
import Header from '@/components/Header';
import EventList from '@/components/EventList';
import EventDetails from '@/components/EventDetails';
import CreateEventForm from '@/components/CreateEventForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleBack = () => {
    setSelectedEventId(null);
  };

  return (
    <div className="min-h-screen bg-space-black">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {selectedEventId ? (
            <EventDetails 
              eventId={selectedEventId} 
              onBack={handleBack}
            />
          ) : (
            <Tabs defaultValue="explore" className="space-y-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass-card border-white/20">
                <TabsTrigger 
                  value="explore" 
                  className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
                >
                  Explore Events
                </TabsTrigger>
                <TabsTrigger 
                  value="create"
                  className="data-[state=active]:bg-neon-green data-[state=active]:text-space-black"
                >
                  Create Event
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="explore" className="space-y-8">
                <EventList onEventSelect={handleEventSelect} />
              </TabsContent>
              
              <TabsContent value="create" className="space-y-8">
                <CreateEventForm />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
};

export default Index;
