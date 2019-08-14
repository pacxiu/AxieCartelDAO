import AxieDaoAbi from './AxieDao.json';
import GuildBankAbi from './GuildBank.json';

const contracts = {
  AxieDao: {
    abi: AxieDaoAbi,
    address: '0x0372f3696fa7dc99801f435fd6737e57818239f2',
  },
  GuildBank: {
    abi: GuildBankAbi,
    address: '0x93d2a6369d57fdf8d1c3db22a5eb4623e26a24ae',
  },
};

export default contracts;
