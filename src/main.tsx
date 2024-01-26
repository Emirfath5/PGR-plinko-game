import './styles/global.css'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Routes } from 'routes'
import { useAuthStore } from 'store/auth';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!

const root = createRoot(container)

const App = () => {
  const [nftCount, setNftCount] = useState<number | null>(null);
  const authUser = useAuthStore(state => state.user);

  const fetchNftCount = async () => {
    try {
      if (window.ethereum) {
        // Connect to MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Your custom contract address (replace with your actual contract address)
        const contractAddress = '0xYourCustomContractAddress';

        // Use web3 or ethers to interact with your NFT contract
        // For simplicity, let's assume a hypothetical function `getNftCount` on your contract
        // Replace this with your actual function and method to fetch NFT count
        const contract = new window.ethereum.Contract(/* your ABI */, contractAddress);
        const fetchedNftCount = await contract.methods.getNftCount(authUser.id).call();

        setNftCount(Number(fetchedNftCount));
      } else {
        console.error('MetaMask not detected. Please install MetaMask to interact with Ethereum.');
      }
    } catch (error) {
      console.error('Error fetching NFT count:', error);
    }
  };

  useEffect(() => {
    fetchNftCount();
  }, [authUser]);

  return (
    <>
      <Routes />
      <Toaster />
      {/* Display NFT count or loading indicator */}
      {nftCount !== null ? (
        <div>NFT Count: {nftCount}</div>
      ) : (
        <div>Loading NFT count...</div>
      )}
    </>
  );
};

root.render(<App />);
