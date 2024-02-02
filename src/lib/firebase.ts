/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { initializeApp } from 'firebase/app'
import { useDeviceLanguage, getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY!,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN!,
  projectId: 'plinko-balls',
  storageBucket: 'plinko-balls.appspot.com',
  messagingSenderId: '203383280650',
  appId: import.meta.env.VITE_FIREBASE_APP_ID!,
  measurementId: 'G-4W19TNHHXZ'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const database = getDatabase(app)

useDeviceLanguage(auth)
function updateSmartContract(userAddress, newBalance) {
  // Assume you have the contract instance (web3 or ethers) available
  // const myContract = ...;

  // Trigger a function in your contract to update user balance
  myContract.updateUserBalance(userAddress, newBalance);

  // You might want to emit an event or handle other logic here
}

// Assume you get data from Firebase
const userAddress = '0x...'; // Ethereum address
const newBalance = 25; // New balance from Firebase

// Update Ethereum smart contract
updateSmartContract(userAddress, newBalance);
