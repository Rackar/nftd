import { web3instance } from './getWeb3';

function dnftidCanGetLoli(dnftid) {
  const dnftidsHaveLoli = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; //暂定5-14号dnft可以获取loli
  return dnftidsHaveLoli.some((id) => id == dnftid);
}

//该用户地址有多少币可以提取
function getLOLICanClaimOf(dnftid, address_User) {
  return new Promise((resolve, reject) => {
    web3instance.dloliContract.methods
      .getLOLICanClaimOf(dnftid, address_User)
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
function dNFTidToAccountToFetched(dnftid, address_User) {
  return new Promise((resolve, reject) => {
    web3instance.dloliContract.methods
      .dNFTidToAccountToFetched(dnftid, address_User)
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
function fetchLOLI(dnftid) {
  return new Promise((resolve, reject) => {
    web3instance.dloliContract.methods
      .fetchLOLI(dnftid)
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

export {
  getLOLICanClaimOf,
  dNFTidToAccountToFetched,
  fetchLOLI,
  dnftidCanGetLoli,
};
