const Web3 = require('web3');
import detectEthereumProvider from '@metamask/detect-provider';
import {
  address_DNFT,
  ABI_DNFT,
  address_NFT,
  ABI_NFT,
  ABI_DLOLI,
  address_DLOLI,
} from './contract';

let web3instance = {
  web3: null,
  account: null,
  chainId: null,
  dnftContract: null,
  nftContract: null,
  dloliContract: null,
};

const init = (provider) => {
  if (!provider) {
    if (window.ethereum && window.ethereum.selectedAddress) {
      // 已登录
      provider = window.ethereum;
    } else {
      // 未登录
      provider = new Web3.providers.WebsocketProvider(
        'wss://kovan.infura.io/ws/v3/bd6e30f7beaf4dc9ad34adf9792bd509',
        {
          clientConfig: {
            keepalive: true,
            keepaliveInterval: 60000, // milliseconds
          },
        }
      );
    }
  }
  provider.removeListener('accountsChanged', () => {});
  provider.removeListener('chainChanged', () => {});
  provider.on('accountsChanged', setIns);

  provider.on('chainChanged', setIns);
  function setIns() {
    let web3 = new Web3(provider);
    web3.eth.defaultAccount = provider.selectedAddress;
    console.log('new user ad ' + provider.selectedAddress);
    const account = provider.selectedAddress;
    const chainId = provider.chainId;

    const dnftContract = new web3.eth.Contract(ABI_DNFT, address_DNFT); //dnft
    const nftContract = new web3.eth.Contract(ABI_NFT, address_NFT); //dnft
    const dloliContract = new web3.eth.Contract(ABI_DLOLI, address_DLOLI); //dnft

    web3instance = {
      web3,
      account,
      chainId,
      dnftContract,
      nftContract,
      dloliContract,
    };
  }
  setIns();
  // const web3 = new Web3(provider);
  // const account = provider.selectedAddress;
  // const chainId = provider.chainId;
  // const dnftContract = new web3.eth.Contract(ABI_DNFT, address_DNFT); //dnft
  // const nftContract = new web3.eth.Contract(ABI_NFT, address_NFT); //dnft
  // const dloliContract = new web3.eth.Contract(ABI_DLOLI, address_DLOLI); //dnft

  // web3instance={web3,account,chainId,dnftContract,nftContract,dloliContract}
};
const requestLoginMetaMask = async () => {
  const provider = await detectEthereumProvider();
  // debugger;
  if (provider) {
    // From now on, this should always be true:
    // provider === window.ethereum
    // initialize your app
    // await provider.enable();//之前的激活方式
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    }); //根据官方文档新的激活方式

    function handleChainChanged(_chainId) {
      // We recommend reloading the page, unless you must do otherwise
      web3instance.chainId = _chainId;
      // window.location.reload();
    }
    function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== web3instance.account) {
        web3instance.account = accounts[0];
        // Do any other work!
      }
    }

    const chainId = await provider.request({ method: 'eth_chainId' });
    handleChainChanged(chainId);

    provider
      .request({ method: 'eth_accounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });
    provider.removeListener('accountsChanged', () => {});
    provider.removeListener('chainChanged', () => {});
    provider.on('accountsChanged', handleAccountsChanged);

    provider.on('chainChanged', handleChainChanged);
    init(provider);
    return true;
  } else {
    return false;
  }
};

async function getDLoliContract(params) {}

async function getLoginedWeb3Instance() {
  await requestLoginMetaMask();
  return web3instance;
}

function getUnloginWeb3Instance() {
  const provider = new Web3.providers.WebsocketProvider(
    'wss://kovan.infura.io/ws/v3/bd6e30f7beaf4dc9ad34adf9792bd509',
    {
      clientConfig: {
        keepalive: true,
        keepaliveInterval: 60000, // milliseconds
      },
    }
  );
  const web3 = new Web3(provider);
  const dnftContract = new web3.eth.Contract(ABI_DNFT, address_DNFT); //dnft
  const nftContract = new web3.eth.Contract(ABI_NFT, address_NFT); //dnft
  const dloliContract = new web3.eth.Contract(ABI_LOLI, address_LOLI); //dnft

  return {
    web3,
    account: null,
    chainId: null,
    dnftContract,
    nftContract,
    dloliContract,
  };
}

export {
  requestLoginMetaMask,
  init,
  web3instance,
  address_DNFT,
  ABI_DNFT,
  address_NFT,
  ABI_NFT,
  address_DLOLI,
  ABI_DLOLI,
};
