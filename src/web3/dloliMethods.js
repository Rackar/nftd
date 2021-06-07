import { web3instance } from './getWeb3';

//该用户地址是否有币可以提取
function getLOLICanClaimOf(address_User) {
  return new Promise((resolve, reject) => {
    web3instance.dloliContract.methods
      .getLOLICanClaimOf(address_User)
      .call()
      .then(function (result) {
        console.log('you have LOLI: ' + JSON.stringify(result));
        resolve(result);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
}

//判断是否领取过
function accountToFetched(address_User) {
  return new Promise((resolve, reject) => {
    web3instance.dloliContract.methods
      .accountToFetched(address_User)
      .call()
      .then(function (result) {
        console.log('you had fetch LOLI: ' + JSON.stringify(result));
        resolve(result);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
}

//领取
function fetchLOLI() {
  return new Promise((resolve, reject) => {
    web3instance.dloliContract.methods
      .fetchLOLI()
      .send({ from: web3instance.account })
      .then(function (result) {
        console.log('you got LOLI: ' + JSON.stringify(result));
        resolve(result);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
}

export { getLOLICanClaimOf, accountToFetched, fetchLOLI };
