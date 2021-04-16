export interface ExampleStateInterface {
  prop: boolean;
  nftIdApproved: string;
  dnfts: {
    NFTCotract: string
    NFTid: string
    Principal: string
    Selling: string
    dNFTid: string
    description: string
    image: string
    name: string
    updatedAt: string
  }[];
}

function state(): ExampleStateInterface {
  return {
    prop: false,
    nftIdApproved: '',
    dnfts: []
  }
};

export default state;
