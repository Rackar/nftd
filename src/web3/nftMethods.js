import {web3instance } from "./getWeb3";
import { address_DNFT,ABI_DNFT,address_NFT,ABI_NFT, ABI_DLOLI, address_DLOLI } from "./contract";
import { api, base } from '../boot/axios';

function awardItem(userAdress,current) {
  return new Promise(async (resolve, reject) => {
    let index = await web3instance.nftContract.methods.totalSupply().call();
    index = parseInt(index) + 1;
    web3instance.nftContract.methods
      .awardItem(userAdress, base + 'nfts?id=' + index)
      .send({
        from: userAdress,
      })
      .then(async function (result) {
        let res = result.events.Transfer.returnValues;
        if (res.tokenId != index) {
          console.log('NFT入库tokenURI id矛盾');
          return;
        }
        let nft = {
          name: current.name,
          description: current.description,
          image: current.image,
          artistName: current.artistName,
          artistInfo: current.artistInfo,
          nftid: index,
          contractAd: address_NFT,
        };
        console.log('NFT status: ' + JSON.stringify(result));
        let s = await api.post('nfts', { nft });
        if (s) {
          // debugger;
          console.log(s);
          approve( index, userAdress);
        }
        resolve(result);
      })
      .catch((e) => {
        console.log(e);
        current.loading = false;
      });
  });
  
}

function approve( tokenId, userAdress) {
  return new Promise((resolve, reject) => {
    web3instance.nftContract.methods
      .approve(address_DNFT, tokenId)
      .send({ from: userAdress })
      .then(function (result) {
        resolve(result);
      })
      .catch((e) => {
        console.log(e);
        reject(e)
      });
  });
}


export {awardItem,approve}