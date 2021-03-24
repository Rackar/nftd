export interface ExampleStateInterface {
  prop: boolean;
  nftIdApproved: string;
}

function state(): ExampleStateInterface {
  return {
    prop: false,
    nftIdApproved: ''
  }
};

export default state;
