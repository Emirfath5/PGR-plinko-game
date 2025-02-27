import classNames from 'classnames';
import { User } from 'pages/ScoreBoard/@types/player';
import { Crown, FinnTheHuman } from 'phosphor-react';
import { useAuthStore } from 'store/auth';
import { formatPoints } from 'utils/currencyFormat';

interface ScoreBoardPlayerItemProps {
  player: User;
  position: number;
  onClick: () => void;
}

export function ScoreBoardPlayerItem({
  player,
  position,
  onClick
}: ScoreBoardPlayerItemProps) {
  const currentUser = useAuthStore(state => state.user);
  const transferPoints = useAuthStore(state => state.transferPoints);

  const handleTransferPoints = async () => {
    try {
      // Replace 'YOUR_CONTRACT_ADDRESS' and 'YOUR_CONTRACT_ABI' with your actual contract details
      const contractAddress = 'YOUR_CONTRACT_ADDRESS';
      const contractAbi = YOUR_CONTRACT_ABI;

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, contractAbi, ethers.getDefaultProvider());

      // Replace 'player.uid' with the Ethereum address of the selected player
      const toAddress = player.uid;

      // Replace 'amount' with the desired amount of points to transfer
      const amount = 10;

      // Trigger the points transfer
      const tx = await contract.transferPoints(toAddress, amount);

      // Wait for the transaction to be mined
      await tx.wait();

      // Handle success (update UI, show notification, etc.)
      console.log(`Points transferred to ${toAddress} successfully`);
    } catch (error) {
      // Handle errors (show error message, etc.)
      console.error('Error transferring points:', error);
    }
  };
  
  return (
    <button
      onClick={() => {
        onClick();
        handleTransferPoints();
      }}
      className={classNames(
        'group relative flex items-center justify-between gap-4 rounded-md p-1 px-2 hover:bg-secondary/80',
        {
          'bg-secondary/60': player.uid === currentUser.id,
          'bg-secondary/20': player.uid !== currentUser.id
        }
      )}
      key={player.uid + player.name}
    >
      {position <= 2 && (
        <Crown
          className={classNames(
            'absolute -right-1 bottom-0 transition-colors',
            {
              'text-yellow-400': position === 0,
              'text-gray-300': position === 1,
              'text-yellow-800': position === 2
            }
          )}
          weight="fill"
          size="20"
        />
      )}
      <div
        className={classNames(
          'flex max-w-full flex-1 items-center justify-between gap-4',
          {
            'text-purple': player.uid === currentUser.id,
            'text-text': player.uid !== currentUser.id
          }
        )}
      >
        <p className="max-w-[15ch] overflow-hidden truncate text-left group-hover:text-transparent lg:w-[15ch] lg:max-w-[15ch]">
          {player.uid === currentUser.id ? (
            <strong>You</strong>
          ) : (
            player.name || 'Anonymous Player'
          )}
        </p>
        <p className="absolute left-1/3 hidden animate-pulse text-text group-hover:block">
          Click to go to the profile
        </p>
        <p
          className="text-right font-bold text-sm transition-colors group-hover:text-transparent lg:w-[50ch]  lg:max-w-[50ch] lg:text-lg"
          title={String(player.currentBalance)}
        >
          {formatPoints(player.currentBalance)}
        </p>
      </div>
      {player.profilePic ? (
        <img
          src={player.profilePic}
          referrerPolicy="no-referrer"
          alt={player.name + ' Avatar'}
          className="w-8 rounded-full group-hover:text-transparent"
        />
      ) : (
        <FinnTheHuman size="30" weight="fill" />
      )}
    </button>
  );
}

