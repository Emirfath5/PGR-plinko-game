import create from 'zustand';

// Define the updateGamesRunning function (replace this with your actual implementation)
const updateGamesRunning = async (newGamesRunningValue) => {
  // Your logic to update gamesRunning in the Solidity contract
  // This function should interact with the Ethereum blockchain using web3 or ethers
  console.log('Updating games running in Solidity contract:', newGamesRunningValue);
};

// Define the Zustand store
const useGameStore = create((set, get) => ({
  gamesRunning: 0,
  setGamesRunning: async (gamesRunning) => {
    // Update the games running state locally
    set({ gamesRunning });

    // Call the Solidity contract function to update games running state
    await updateGamesRunning(gamesRunning);
  },
  incrementGamesRunning: async () => {
    const gamesRunning = get().gamesRunning;
    const calc = gamesRunning + 1;

    // Update the games running state locally
    set({ gamesRunning: calc < 0 ? 1 : calc });

    // Call the Solidity contract function to update games running state
    await updateGamesRunning(calc < 0 ? 1 : calc);
  },
  decrementGamesRunning: async () => {
    const gamesRunning = get().gamesRunning;
    const calc = gamesRunning - 1;

    // Update the games running state locally
    set({ gamesRunning: calc < 0 ? 0 : calc });

    // Call the Solidity contract function to update games running state
    await updateGamesRunning(calc < 0 ? 0 : calc);
  },
}));

export default useGameStore;
