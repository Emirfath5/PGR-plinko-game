import { Gift } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store/auth'
import { formatPoints } from 'utils/currencyFormat'

export function Gifts() {
  const redeemGift = useAuthStore(state => state.redeemGift)
  const currentBalance = useAuthStore(state => state.wallet.balance)
  const navigate = useNavigate()
  async function handleRedeemGift() {
    await redeemGift()
    navigate('/')
  }

  async function handleRedeemGift() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];

      // Create an instance of the ERC-20 contract
      const erc20Contract = new window.ethereum.Contract(erc20ABI, erc20Address);

      // Check the user's token balance
      const userTokenBalance = await erc20Contract.methods.balanceOf(userAddress).call();

      // Define the redemption amount (adjust this based on your logic)
      const redemptionAmount = 3; // Replace with your desired redemption amount

      // Check if the user has enough tokens for redemption
      if (userTokenBalance >= redemptionAmount) {
        // Call the ERC-20 transfer function to redeem tokens
        await erc20Contract.methods
          .YOUR_ERC20_TRANSFER_FUNCTION(YOUR_REDEMPTION_ADDRESS, redemptionAmount)
          .send({
            from: userAddress,
          });

        // Update your application's internal record of the user's balance
        updateInternalBalance(userAddress);

        // Continue with the existing redemption logic
        await redeemGift();
        navigate('/');
      } else {
        // Handle insufficient balance (show a message, etc.)
        console.log('Insufficient balance for redemption');
      }
    } catch (error) {
      // Handle errors (show an error message, etc.)
      console.error('Error during redemption:', error);
    }
  }

  return (
   <div className="flex h-full flex-col items-center justify-center gap-4 text-text">
  <Gift className="text-purple" weight="fill" size="80" />
  <span className="text-center text-lg font-bold">
    Yay!!! We have $REAP for you!
  </span>
  <span className="text-center text-lg font-bold">
    We noticed that you only have{' '}
    <span className="text-purple">{formatPoints(currentBalance)}</span>{' '}
    points.
    <br />
    But don't worry, on this page, you can redeem up to{' '}
    <span className="text-purple">3</span> points
    <br /> each time your balance is below{' '}
    <span className="text-purple">3 $REAP</span>. <br />
    Just click the button below and try your luck. <br />
  </span>
  <button
    onClick={handleRedeemGift}
    className="rounded-md bg-purpleDark px-4 py-2 font-bold text-text transition-colors hover:bg-purple"
  >
    REDEEM
  </button>
</div>
  )
}
