import Web3 from 'web3';

function countToWei(number = 1) {
  return Web3.utils.toWei((number * 0.001).toString());
}
function weiToCount(amount = '') {
  return Web3.utils.fromWei(amount);
}

export { countToWei, weiToCount };
