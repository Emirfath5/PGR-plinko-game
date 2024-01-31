// Web3Util.js
import Web3 from 'web3';

// Replace with your actual contract ABI and address
const contractABI = [...];
const contractAddress = '0x1234567890123456789012345678901234567890';

// Function to initialize Web3
export async function initWeb3() {
  if (window.ethereum) {
    await window.ethereum.enable();
    return new Web3(window.ethereum);
  } else {
    throw new Error('MetaMask or other Ethereum provider not detected.');
  }
}

// Function to send funds to the opponent
export async function sendFundsToOpponent(opponentAddress, userCut) {
  try {
    const web3 = await initWeb3();
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const checksumOpponentAddress = web3.utils.toChecksumAddress(opponentAddress);
    const userCutInWei = web3.utils.toWei(userCut.toString(), 'ether');

    await contract.methods.sendFundsToOpponent(checksumOpponentAddress, userCutInWei).send({
      from: userAddress,
      value: userCutInWei,
    });

    console.log(`Sent ${userCut} ETH to opponent at address ${checksumOpponentAddress}`);
  } catch (error) {
    console.error('Error sending funds to opponent:', error.message);
  }
}

// YourComponent.jsx
import { Coin, CurrencyDollarSimple, Smiley } from 'phosphor-react';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from 'store/auth';

interface PlinkoBetActions {
  onRunBet: (betValue: number) => void;
  onChangeLines: (lines: LinesType) => void;
  inGameBallsCount: number;
}

type TokenType = 'polygon' | 'erc20'; // New type for token selection

export function BetActions({
  onRunBet,
  onChangeLines,
  inGameBallsCount
}: PlinkoBetActions) {
  const isLoading = useAuthStore(state => state.isWalletLoading);
  const currentBalance = useAuthStore(state => state.wallet.balance);
  const decrementCurrentBalance = useAuthStore(state => state.decrementBalance);
  const isAuth = useAuthStore(state => state.isAuth);
  const [betValue, setBetValue] = useState(0);

  const [opponentAddress, setOpponentAddress] = useState<string | null>(null);

  // New function to find an opponent
  const findOpponent = async () => {
    try {
      // Call your smart contract function to find an opponent
      const opponent = await yourContract.findOpponent();
      setOpponentAddress(opponent);
    } catch (error) {
      console.error("Error finding opponent:", error);
    }
  };

  async function handleRunBet() {
    if (!isAuth || isLoading || !opponentAddress) return;
    if (inGameBallsCount >= 15) return;
    if (betValue > currentBalance) {
      setBetValue(currentBalance);
      return;
    }

    // Owner gets 2% of every transaction
    const ownerCut = betValue * 0.02;
    const userCut = betValue - ownerCut;

    // Send funds to the opponent
    await sendFundsToOpponent(opponentAddress, userCut);

    onRunBet(userCut);

    if (userCut <= 0) return;

    await decrementCurrentBalance(userCut);
  }

  function handleChangeBetValue(e: ChangeEvent<HTMLInputElement>) {
    if (!isAuth || isLoading) return;
    e.preventDefault();
    const value = +e.target.value;
    const newBetValue = value >= currentBalance ? currentBalance : value;
    setBetValue(newBetValue);
  }

  function handleChangeLines(e: ChangeEvent<HTMLSelectElement>) {
    if (!isAuth || isLoading) return;

    onChangeLines(Number(e.target.value) as LinesType);
  }

  function handleHalfBet() {
    if (!isAuth || isLoading) return;
    const value = betValue / 2;
    const newBetvalue = value <= 0 ? 0 : Math.floor(value);
    setBetValue(newBetvalue);
  }

  function handleDoubleBet() {
    if (!isAuth || isLoading) return;
    const value = betValue * 2;

    if (value >= currentBalance) {
      setBetValue(currentBalance);
      return;
    }

    const newBetvalue = value <= 0 ? 0 : Math.floor(value);
    setBetValue(newBetvalue);
  }

  function handleMaxBet() {
    if (!isAuth || isLoading) return;
    setBetValue(currentBalance);
  }

  async function handleRunBet() {
    if (!isAuth || isLoading) return;
    if (inGameBallsCount >= 15) return;
    if (betValue > currentBalance) {
      setBetValue(currentBalance);
      return;
    }


// Function to send funds to the owner
async function sendFundsToOwner(ownerAddress, ownerCut) {
  try {
    // Connect to the user's Ethereum provider (e.g., MetaMask)
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      console.error('MetaMask or other Ethereum provider not detected.');
      return;
    }

    // Create a Web3 instance
    const web3 = new Web3(window.ethereum);

    // Set the default account to the user's account
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    // Create a contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Convert the owner's address to a checksum address
    const checksumOwnerAddress = web3.utils.toChecksumAddress(ownerAddress);

    // Convert the owner's cut to Wei (1 Ether = 1e18 Wei)
    const ownerCutInWei = web3.utils.toWei(ownerCut.toString(), 'ether');

    // Send funds to the owner using the contract's method
    await contract.methods.sendFundsToOwner(checksumOwnerAddress, ownerCutInWei).send({
      from: userAddress,
      value: ownerCutInWei,
    });

    console.log(`Sent ${ownerCut} ETH to owner at address ${checksumOwnerAddress}`);
  } catch (error) {
    console.error('Error sending funds to owner:', error);
  }
}

// Call the function with the owner's address and cut
const ownerAddress = '0x9876543210987654321098765432109876543210'; // Replace with the actual owner's address
const ownerCut = 0.1; // Replace with the actual owner's cut
sendFundsToOwner(ownerAddress, ownerCut);


  return (
    <div className="relative h-1/2 w-full flex-1 py-8 px-4">
      <span className="absolute left-4 top-0 mx-auto text-xs font-bold text-text md:text-base">
        *balls in play {inGameBallsCount}/15
      </span>

      <div className="flex h-full flex-col gap-4 rounded-md bg-primary p-4 text-text md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-stretch gap-1 md:flex-col">
            <div className="w-full text-sm font-bold md:text-base">
              <div className="flex flex-1 items-stretch justify-between">
                <span>Bet Amount</span>
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-purpleDark p-0.5">
                    <CurrencyDollarSimple weight="bold" />
                  </div>
                  <span>{betValue.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-stretch justify-center shadow-md">
                <input
                  type="number"
                  min={0}
                  max={currentBalance}
                  onChange={handleChangeBetValue}
                  value={betValue}
                  className="w-full rounded-bl-md rounded-tl-md border-2 border-secondary bg-background p-2.5 px-4 font-bold transition-colors placeholder:font-bold placeholder:text-text focus:border-purple focus:outline-none md:p-2"
                />
                <button
                  onClick={handleHalfBet}
                  className="relative border-2 border-transparent bg-secondary p-2.5 px-3 transition-colors after:absolute after:top-[calc(50%_-_8px)] after:right-0 after:h-4 after:w-0.5 after:rounded-lg after:bg-background after:content-[''] hover:bg-secondary/80 focus:border-purple focus:outline-none md:p-2"
                >
                  ½
                </button>
                <button
                  onClick={handleDoubleBet}
                  className="relative border-2 border-transparent bg-secondary p-2.5 px-3 transition-colors after:absolute after:top-[calc(50%_-_8px)] after:right-0 after:h-4 after:w-0.5 after:rounded-lg after:bg-background after:content-[''] hover:bg-secondary/80 focus:border-purple focus:outline-none md:p-2"
                >
                  2x
                </button>
                <button
                  onClick={handleMaxBet}
                  className="rounded-br-md rounded-tr-md border-2 border-transparent bg-secondary p-2 px-3 text-xs transition-colors hover:bg-secondary/80 focus:border-purple focus:outline-none"
                >
                  max
                </button>
              </div>
            </div>

            <button
              onClick={handleRunBet}
              disabled={isLoading}
              className="block rounded-md bg-purple px-2 py-4 text-sm font-bold leading-none text-background transition-colors hover:bg-purpleDark focus:outline-none focus:ring-1 focus:ring-purple focus:ring-offset-1 focus:ring-offset-primary disabled:bg-gray-500 md:hidden"
            >
              Bet
            </button>
          </div>
          <select
            disabled={inGameBallsCount > 0}
            onChange={handleChangeLines}
            defaultValue={16}
            className="w-full rounded-md border-2 border-secondary bg-background py-2 px-4 font-bold transition-all placeholder:font-bold placeholder:text-text focus:border-purple focus:outline-none disabled:line-through disabled:opacity-80"
            id="lines"
          >
            {linesOptions.map(line => (
              <option key={line} value={line}>
                {line} Lines
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleRunBet}
          disabled={isLoading}
          className="hidden rounded-md bg-purple px-6 py-5 font-bold leading-none text-background transition-colors hover:bg-purpleDark focus:outline-none focus:ring-1 focus:ring-purple focus:ring-offset-1 focus:ring-offset-primary disabled:bg-gray-500 md:visible md:block"
        >
          Bet
        </button>
        <div className="flex flex-col items-center gap-4 text-sm font-bold text-text md:items-start lg:absolute lg:-bottom-20 lg:left-4">
          <span>
            If you had fun playing and want to help in some way,
            <span className="flex items-center gap-2">
              donate 1 real to the developer by clicking below.
              <Smiley weight="fill" />
            </span>
          </span>
          <Link
            to="/contribute"
            className="flex items-center gap-2 rounded-md bg-background p-2 font-bold transition-colors hover:bg-primary/50 lg:bg-primary"
          >
            DONATE 1 REAL <Coin />
          </Link>
        </div>
      </div>
    </div>
  );
}
