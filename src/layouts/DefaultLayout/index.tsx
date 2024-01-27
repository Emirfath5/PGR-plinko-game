import React, { useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { Navbar } from 'layouts/DefaultLayout/components/Navbar';
import { database } from 'lib/firebase';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from 'store/auth';
import Web3 from 'web3';

import { Footer } from './components/Footer';
import { Loading } from './components/Loading';

export function DefaultLayout() {
  const isLoading = useAuthStore(state => state.isAuthLoading);
  const setCurrentBalance = useAuthStore(state => state.setBalance);
  const setBalanceOnDatabase = useAuthStore(state => state.setBalanceOnDatabase);
  const isAuth = useAuthStore(state => state.isAuth);
  const user = useAuthStore(state => state.user);
  const walletRef = ref(database, 'wallet/' + user.id);

  // Connect to MetaMask provider
  const web3 = new Web3(window.ethereum);

  // Create a contract instance (replace with your contract ABI and address)
  const contractABI = [...]; // Your contract ABI
  const contractAddress = '0x...'; // Your contract address
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Fetch user's wallet balance
  const fetchUserBalance = async () => {
    try {
      // Ensure that the user has granted permission to interact with the contract
      await window.ethereum.enable();

      // Get the user's Ethereum address from MetaMask
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      // Perform the contract interaction to get the current balance
      const currentBalance = await contract.methods.getWalletBalance(userAddress).call();

      // Update the local state with the fetched balance
      setCurrentBalance(currentBalance);
    } catch (error) {
      console.error('Error fetching user balance:', error);
      // Handle error (show an error message, retry, etc.)
    }
  };

  // Fetch user's balance when the component mounts
  useEffect(() => {
    fetchUserBalance();
  }, [walletRef]);

  return (
    <div className="flex relative min-h-screen w-full flex-col justify-between bg-background">
      <div className="absolute right-6 bottom-6 z-[9999]">
        <a
          href="https://www.polygonreaper.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://im.ezgif.com/tmp/ezgif-1-5ceaf592ce.png"
            alt="Become A Reaper"
            style={{ height: '36.3px', width: '131.285px' }}
          />
        </a>
      </div>
      <Navbar />
      <div className="flex h-full w-full max-w-[1400px] flex-1 overflow-auto overflow-x-hidden pt-4 lg:mx-auto">
        <div className="flex-1">{isLoading ? <Loading /> : <Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
}
