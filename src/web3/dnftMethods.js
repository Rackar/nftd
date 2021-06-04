import {web3instance } from "./getWeb3";

function checkIsOwner() {
    return new Promise((resolve, reject) => {
      console.log(current);
      web3instance.dnftContract.methods
        .owner()
        .call()
        .then(function (result) {
          console.log('owner is: ' + JSON.stringify(result));
          current.isOwner =
            result === Web3.utils.toChecksumAddress(current.account);
          // debugger;
          resolve(result);
        })
        .catch((e) => console.log(e));
    });
  }

 
  
  //检查艺术家ad是否在白名单中
  function artistWhiteList(artistAddress) {
    return new Promise((resolve, reject) => {
      console.log(current);
      web3instance.dnftContract.methods
        .artistWhiteList(artistAddress)
        .call()
        .then(function (result) {
          console.log('is in whitelist? ' + JSON.stringify(result));
          resolve(result);
        });
    });
  }
  //设置地址为艺术家白名单
  function setArtist(artistAddress) {
    return new Promise((resolve, reject) => {
      console.log(current);
      web3instance.dnftContract.methods
        .setArtist(artistAddress, true)
        .send({ from: current.account })
        .then(function (result) {
          console.log('set artist: ' + JSON.stringify(result));
          resolve(result);
        });
    });
  }

  function wrapNFT(contractAd, NFTid) {
    $q.loading.show({
      message: 'Please wait a few seconds...',
    });

    return new Promise((resolve, reject) => {
      console.log(current);
      web3instance.dnftContract.methods
        .wrap(contractAd, parseInt(NFTid), config.defaultSellLastingSecends, config.defaultUnitPrice)
        .send({ from: current.account })
        .then(function (result) {
          console.log('dNFT: ' + JSON.stringify(result));
          $q.loading.hide();
          $q.notify('dnft wrapped.');
          $store.commit('example/setNftIdApproved', '');
          let dnftUrl = `/nft/${contractAd}/${NFTid}/${result.events.TransferSingle.returnValues.id}`;
          current.sellShow = false;
          current.sellNFTid = '';
          router.push(dnftUrl);

          resolve(result);
          
        })
        .catch((e) => {
          console.log(e);
          $q.loading.hide();
        });
    });
  }


  function idTodNFT(dNFTid) {
    return new Promise((resolve, reject) => {
      web3instance.dnftContract.methods
        .idTodNFT(dNFTid)
        .call()
        .then(function (result) {
          console.log('dNFT status: ' + JSON.stringify(result));
          resolve(result);
          
        })
        .catch((e) => console.log(e));
    });
  }
  function unClaimOf(dNFTid, ownerAddress) {
    return new Promise((resolve, reject) => {
      web3instance.dnftContract.methods
        .unClaimOf(dNFTid, ownerAddress)
        .call({ from: current.account })
        .then(function (result) {
          console.log('dNFT claim : ' + JSON.stringify(result));
          resolve(result);
          let t = '3499999999999935';
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  }
  function claimByOwner(dNFTid) {
    return new Promise((resolve, reject) => {
      current.loadingMyOwnList = true;
      web3instance.dnftContract.methods
        .claimPrincipalFunds(dNFTid)
        .send({ from: current.account })
        .then(async function (result) {
          console.log('dNFT claim : ' + JSON.stringify(result));
          await api.post('ownclaim', { dnftid: dNFTid });
          current.myOwnList = current.myOwnList.filter(
            (element) => element.dNFTid !== dNFTid
          );
          current.loadingMyOwnList = false;
          resolve(result);
          let t = '3499999999999935';
        })
        .catch((e) => {
          current.loadingMyOwnList = false;
          console.log(e);
          reject(e);
        });
    });
  }
  function claim(dNFTid) {
    $q.loading.show({
      message: 'Please wait a few seconds...',
    });
    return new Promise((resolve, reject) => {
      web3instance.dnftContract.methods
        .claim(dNFTid)
        .send({ from: current.account })
        .then(function (result) {
          console.log('dNFT claim status: ' + JSON.stringify(result));
          $q.loading.hide();
          $q.notify('Claim success');
          current.showAccount = false;
          resolve(result);
          let t = {};
        })
        .catch((e) => console.log(e));
    });
  }
  ///分配出售NFT的钱给各股东
  function fundNFT(dNFTid, number) {
    return new Promise((resolve, reject) => {
      web3instance.dnftContract.methods
        .fundNFT(dNFTid)
        .send({
          from: current.account,
          value: Web3.utils.toWei(number.toString()),
        })
        .then(function (result) {
          debugger;
          console.log('fundNFT status: ' + JSON.stringify(result));
          resolve(result);
          let t = {};
        })
        .catch((e) => console.log(e));
    });
  }

export {}