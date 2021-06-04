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
      .catch((e) => console.log(e));
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
      .catch((e) => console.log(e));
  });
}

function fetchLOLI() {
  return new Promise((resolve, reject) => {
    web3instance.dloliContract.methods
      .fetchLOLI()
      .send()
      .then(function (result) {
        console.log('you got LOLI: ' + JSON.stringify(result));
        resolve(result);
      })
      .catch((e) => console.log(e));
  });
}

export { getLOLICanClaimOf, accountToFetched, fetchLOLI };
