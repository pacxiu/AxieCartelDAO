import AxieDaoAbi from './AxieDao.json';
import GuildBankAbi from './GuildBank.json';
import DAIAbi from './DAI.json';
import WETHAbi from './WETH.json';

// export const WETH_TOKEN = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
export const WETH_TOKEN = '0x966082590325D65Fb3B162582a04c255Da1ee898';
export const DAI_TOKEN = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359';

const contracts = {
  AxieDao: {
    abi: AxieDaoAbi,
    // address: '0x0372f3696fa7dc99801f435fd6737e57818239f2',
    address: '0x18e5008675d60603cc4ced303d2562d3744fb837',
  },
  GuildBank: {
    abi: GuildBankAbi,
    // address: '0x93d2a6369d57fdf8d1c3db22a5eb4623e26a24ae',
    address: '0xA4d5e5Ba209ae39bFAa36e6591cD35f69f04eaFf',
  },
  ApprovedToken: {
    abi: WETHAbi,
    address: WETH_TOKEN,
  },
};

export default contracts;
