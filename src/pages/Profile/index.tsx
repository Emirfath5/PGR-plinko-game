import { Crown, FinnTheHuman } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'store/auth';
import { formatPoints } from 'utils/currencyFormat';
import { Contract, ethers } from 'ethers';

interface User {
  name: string;
  profilePic: string;
  uid: string;
  currentBalance: number;
  position: number;
  nftCount: number;
}

interface OpenSeaNFT {
  imageUrl: string;
  name: string;
  price: string; // Add the price property
  rarity: string; // Add the rarity property
  // Add other properties you need from the OpenSea API response
}

export function Profile(user: User) {
  const authUser = useAuthStore(state => state.user);
  const [nftCount, setNftCount] = useState<number | null>(null);
  const [userNFTs, setUserNFTs] = useState<OpenSeaNFT[]>([]);

  const fetchOpenSeaNFTs = async () => {
    try {
      // Replace 'YOUR_OPENSEA_API_URL' with the actual OpenSea API endpoint
      const response = await fetch('YOUR_OPENSEA_API_URL');
      const data = await response.json();

      // Extract relevant information from the OpenSea API response
      const nfts = data.assets.map((asset: any) => ({
        imageUrl: asset.image_url,
        name: asset.name,
        price: asset.sell_orders ? asset.sell_orders[0]?.current_price : 'Not for sale',
        rarity: asset.traits.find((trait: any) => trait.trait_type === 'Rarity')?.value || 'Unknown',
        // Add other properties you need from the OpenSea API response
      }));

      setUserNFTs(nfts);
      setNftCount(nfts.length);
    } catch (error) {
      console.error('Error fetching OpenSea NFTs:', error);
    }
  };

  useEffect(() => {
    fetchOpenSeaNFTs(); // Fetch the OpenSea NFT data when the component mounts
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-primary p-2 px-6 text-text">
      {/* ... (existing profile information) */}

      {nftCount !== null && (
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">Number of NFTs: {nftCount}</span>
          <div className="flex flex-wrap gap-2">
            {userNFTs.map((nft, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={nft.imageUrl}
                  alt={nft.name}
                  className="w-16 h-16 rounded-full"
                />
                <span className="text-sm">{nft.name}</span>
                <span className="text-sm">{`Price: ${nft.price}`}</span>
                <span className="text-sm">{`Rarity: ${nft.rarity}`}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



