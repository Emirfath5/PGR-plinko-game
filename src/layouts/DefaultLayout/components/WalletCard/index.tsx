import React from 'react'; // Add the import statement for React
import { CurrencyDollarSimple } from 'phosphor-react';

interface WalletCardProps {
  balance: number;
  tokenSymbol: string;
}

// Define your WalletCard component
export function WalletCard({ balance, tokenSymbol }: WalletCardProps) {
  return (
    <div className="flex cursor-pointer items-stretch">
      <div className="flex items-center gap-2 rounded-tl-md rounded-bl-md bg-background px-2 py-1 pr-4 font-bold uppercase text-white md:text-lg">
        <span className="rounded-full bg-purpleDark p-1">
          <CurrencyDollarSimple weight="bold" />
        </span>
        <span title={String(balance)}>{balance} {tokenSymbol}</span>
      </div>
      <span
        title={tokenSymbol}
        className="rounded-tr-md rounded-br-md bg-purpleDark p-2 font-bold text-white"
      >
        {tokenSymbol}
      </span>
    </div>
  );
}

// Use your WalletCard component in your application
function App() {
  return (
    <div>
      <WalletCard balance={0} tokenSymbol="MATIC" />
      <WalletCard balance={0} tokenSymbol="$REAP" />
    </div>
  );
}

export default App; // Export your component or application if needed
