
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreateEventForm = () => {
  const [eventData, setEventData] = useState({
    image: null as File | null,
    caption: '',
    ticker: ''
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventData({ ...eventData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventData.image || !eventData.caption || !eventData.ticker) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate Zora Coins SDK integration
    console.log('Creating event with Zora Coins SDK:', eventData);
    
    toast({
      title: "Event Created! 🎉",
      description: `Ticker $${eventData.ticker} has been minted as NFT`,
    });

    // Reset form
    setEventData({ image: null, caption: '', ticker: '' });
    setImagePreview(null);
  };

  return (
    <Card className="glass-card border-white/20 max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-2xl">
          <Ticket className="w-6 h-6 text-neon-green" />
          <span>Create New Event</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Event Image</Label>
            <div 
              className={`border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer transition-all duration-300 hover:border-electric-blue/50 ${
                imagePreview ? 'border-neon-green/50' : ''
              }`}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Event preview" 
                  className="max-h-48 mx-auto rounded-lg"
                />
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Event Caption</Label>
            <Textarea
              id="caption"
              placeholder="Describe your amazing event..."
              value={eventData.caption}
              onChange={(e) => setEventData({ ...eventData, caption: e.target.value })}
              maxLength={120}
              className="glass-card border-white/20 focus:border-electric-blue/50"
            />
            <p className="text-sm text-gray-400 text-right">
              {eventData.caption.length}/120
            </p>
          </div>

          {/* Ticker */}
          <div className="space-y-2">
            <Label htmlFor="ticker">Coin Ticker</Label>
            <div className="flex items-center space-x-2">
              <span className="text-neon-green font-bold">$</span>
              <Input
                id="ticker"
                placeholder="FEST"
                value={eventData.ticker}
                onChange={(e) => setEventData({ ...eventData, ticker: e.target.value.toUpperCase() })}
                maxLength={5}
                className="glass-card border-white/20 focus:border-electric-blue/50 uppercase"
              />
            </div>
            <p className="text-sm text-gray-400">
              Maximum 5 characters (e.g., FEST, BEAT, PARTY)
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-neon hover:opacity-90 text-space-black font-bold py-3 text-lg transition-all duration-300 neon-glow"
          >
            <Ticket className="w-5 h-5 mr-2" />
            Mint Ticket NFT
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateEventForm;
