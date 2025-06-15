
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Globe } from 'lucide-react';

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    // Simulate wallet connection
    if (!isConnected) {
      setWalletAddress('0x1234...5678');
      setIsConnected(true);
    } else {
      setWalletAddress('');
      setIsConnected(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-space-black" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-neon-green bg-clip-text text-transparent">
            NFTickets
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {isConnected && (
            <div className="hidden sm:flex items-center space-x-2 glass-card px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">{walletAddress}</span>
            </div>
          )}
          
          <Button 
            onClick={connectWallet}
            className={`${
              isConnected 
                ? 'bg-neon-green/20 text-neon-green hover:bg-neon-green/30' 
                : 'bg-gradient-electric hover:opacity-90'
            } transition-all duration-300`}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
