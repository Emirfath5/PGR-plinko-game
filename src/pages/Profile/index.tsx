import classNames from 'classnames';
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
  nftCount: number; // New property for holding the number of NFTs
}

export function Profile(user: User) {
  const authUser = useAuthStore(state => state.user);
  const [nftCount, setNftCount] = useState<number | null>(null);

 const contractAddress = 'YOUR_CUSTOM_CONTRACT_ADDRESS'; // Replace with your actual contract address
const abi = [
  // Replace with your contract ABI (Application Binary Interface)
  // ABI is a JSON representation of the smart contract interface
];

const fetchNftCount = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    
    const signer = provider.getSigner();
    const contract = new Contract(contractAddress, abi, signer);

    // Assume your contract has a function named 'getNftCount'
    const fetchedNftCount = await contract.getNftCount();

    setNftCount(fetchedNftCount.toNumber());
  } catch (error) {
    console.error('Error fetching NFT count:', error);
    // Handle error (show an error message, retry, etc.)
  }
};

  useEffect(() => {
    fetchNftCount(); // Fetch the number of NFTs when the component mounts
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-primary p-2 px-6 text-text">
      <div className="relative mx-auto w-32 rounded-full">
        {user.profilePic ? (
          <img
            src={user.profilePic}
            referrerPolicy="no-referrer"
            alt={user.name + ' Avatar'}
            className="w-full rounded-full"
          />
        ) : (
          <FinnTheHuman size="full" weight="fill" />
        )}
        {user.position <= 2 && (
          <Crown
            className={classNames(
              'absolute -right-2 bottom-0 transition-colors',
              {
                'text-yellow-400': user.position === 0,
                'text-gray-300': user.position === 1,
                'text-yellow-800': user.position === 2
              }
            )}
            weight="fill"
            size="40"
          />
        )}
      </div>
      <span
        className={classNames('text-center text-2xl font-bold', {
          'text-purple': user.uid === authUser.id
        })}
      >
        {user.name || 'Anonymous Player'} {user.uid === authUser.id && '(you)'}
      </span>
      <span className="text-center text-xl font-bold">
        {formatPoints(user.currentBalance)} PPs
      </span>
      {nftCount !== null && (
        <span className="text-center text-lg">
          Number of NFTs: {nftCount}
        </span>
      )}
    </div>
  );
}

