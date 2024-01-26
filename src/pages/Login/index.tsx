import { MetaMaskLogo } from 'phosphor-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store/auth';

type LocationState = {
  from?: string;
};

export function LoginPage() {
  const location = useLocation();
  const state = location.state as LocationState;
  const navigate = useNavigate();
  const signIn = useAuthStore(state => state.signIn);
  const isAuth = useAuthStore(state => state.isAuth);

  useEffect(() => {
    if (state && state.from && isAuth) {
      navigate(state.from);
    }
  }, [isAuth]);

  async function handleSignIn() {
    // Implement MetaMask authentication logic
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Use accounts[0] as the user's MetaMask address
      console.log('MetaMask address:', accounts[0]);

      // Continue with your authentication logic
      await signIn();
      navigate('/');
    } catch (error) {
      // Handle MetaMask authentication error
      console.error('MetaMask authentication error:', error);
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-2">
      <span className="text-center text-2xl font-bold text-text">
        Log in to showcase your score to other players.
      </span>
      <button
        onClick={handleSignIn}
        className="flex items-center gap-2 rounded-md bg-blue-500 px-6 py-4 font-bold text-text shadow-sm transition-colors hover:bg-blue-700"
      >
        <MetaMaskLogo size="20" weight="fill" />
        Login with MetaMask
      </button>
    </div>
  );
}
