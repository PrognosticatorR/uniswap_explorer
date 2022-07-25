import axios from 'axios';
import { providers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';

export const TransactionContext = React.createContext();

let eth;

if (typeof window !== 'undefined') {
  eth = window.ethereum;
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState('');
  // const router = useRouter();
  const LS_KEY = 'metamask-auth';

  /**
   * Checks if MetaMask is installed and an account is connected
   * @param {*} metamask Injected MetaMask code from the browser
   * @returns
   */
  const checkIfWalletIsConnected = useCallback(
    async (metamask = eth) => {
      try {
        if (!metamask) return alert('Please install metamask ');
        const authToken = localStorage.getItem(LS_KEY);
        setAuth(authToken);
        const accounts = await metamask.request({ method: 'eth_requestAccounts' });
        if (accounts.length && auth) {
          setCurrentAccount(accounts[0]);
        }
      } catch (error) {
        console.error(error);
        throw new Error('No ethereum object.');
      }
    },
    [auth]
  );
  const handleAuthenticate = async ({ publicAddress, signature }) => {
    const { data } = await axios.post('/api/auth', { publicAddress, signature });
    return data ? { accessToken: data?.accessToken, publicAddress } : {};
  };

  const handleSignMessage = async ({ publicAddress, nonce }) => {
    try {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`);
      const address = await signer.getAddress();
      return { publicAddress, signature, address };
    } catch (err) {
      throw new Error('You need to sign the message to be able to log in.');
    }
  };
  const handleLoggedIn = ({ accessToken, publicAddress }) => {
    localStorage.setItem(LS_KEY, JSON.stringify(accessToken));
    setCurrentAccount(publicAddress);
    setAuth(accessToken);
  };

  const handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    setAuth(undefined);
    setCurrentAccount(null);
  };

  const handleSignup = publicAddress =>
    axios.post('/api/users', { publicAddress }).then(response => {
      return response.data;
    });

  /**
   * Prompts user to connect their MetaMask wallet
   * @param {*} metamask Injected MetaMask code from the browser
   */
  const connectWallet = async (metamask = eth) => {
    // Check if MetaMask is installed
    await checkIfWalletIsConnected();
    setIsLoading(true);
    const accounts = await metamask.request({ method: 'eth_requestAccounts' });
    if (!accounts) {
      window.alert('Please activate MetaMask first.');
      return;
    }

    const publicAddress = accounts[0].toLowerCase();

    // Look if user with current publicAddress is already present on backend
    axios
      .get(`/api/users?publicAddress=${publicAddress}`)
      .then(response => response.data)
      // If yes, retrieve it. If no, create it.
      .then(users => (users.length ? users[0] : handleSignup(publicAddress)))
      // Popup MetaMask confirmation modal to sign message
      .then(handleSignMessage)
      // Send signature to backend on the /auth route
      .then(handleAuthenticate)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then(handleLoggedIn)
      .catch(err => {
        window.alert(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        handleLoggedOut,
        auth,
        isLoading
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
