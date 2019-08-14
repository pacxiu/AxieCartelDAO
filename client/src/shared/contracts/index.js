import AxieDaoAbi from './AxieDao.json';
import GuildBankAbi from './GuildBank.json';
import DAIAbi from './DAI.json';
import WETHAbi from './WETH.json';

export const WETH_TOKEN = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
export const DAI_TOKEN = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359';

const contracts = {
  AxieDao: {
    abi: AxieDaoAbi,
    address: '0x0372f3696fa7dc99801f435fd6737e57818239f2',
  },
  GuildBank: {
    abi: GuildBankAbi,
    address: '0x93d2a6369d57fdf8d1c3db22a5eb4623e26a24ae',
  },
  ApprovedToken: {
    abi: WETHAbi,
    address: WETH_TOKEN,
  },
};

export default contracts;
