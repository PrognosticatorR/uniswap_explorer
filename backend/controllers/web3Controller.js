import axios from 'axios';
import dotenv from 'dotenv';
import ethers from 'ethers';
import _ from 'lodash';
import { contractInterface } from '../constants/interface.js';
import { GET_TRANSACTION_LOGS } from '../constants/queries.js';

const providerUrl = process.env.HTTPS_ENDPOINT;
const contractAddress = process.env.UNISWAP_CONTRACT_ADDRESS;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
class Web3Provider {
  constructor(providerUrl) {
    this.customHttpProvider = new ethers.providers.JsonRpcProvider(providerUrl);
  }
}

class Web3Controller extends Web3Provider {
  constructor() {
    super(providerUrl, contractAddress);
    this.contractAddress = contractAddress;
    this.uniswapURLGraph = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
    this.etherscanApiKey = etherscanApiKey;
    this.iface = new ethers.utils.Interface(contractInterface);
  }
  async getBlockNumber() {
    return this.customHttpProvider.getBlockNumber();
  }

  async getTransactionLogsUsingGraph() {
    const { data } = await axios.post(this.uniswapURLGraph, {
      query: GET_TRANSACTION_LOGS
    });
    return data;
  }

  async getTransactionLogsUsingEtherscan(page, offset) {
    const etherscanAPI = `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${this.contractAddress}&page=${page}&offset=${offset}&apikey=${this.etherscanApiKey}&sort=desc`;
    const { data } = await axios.get(etherscanAPI);
    if (data?.status === '1') {
      const decodedTransactionData = this.decodeTransactionData(data);
      return decodedTransactionData;
    }
    throw new Error(data?.message);
  }

  decodeTransactionData(data) {
    const parsedTransactions = [];
    const queryResult = data?.result;
    queryResult.forEach(res => {
      try {
        const { name, signature } = this.iface.parseTransaction({ data: res?.input });
        let title = _.startCase(_.kebabCase(name));
        //Parse the data to make is usable on client side
        const parsedData = {
          type: name,
          signature,
          title: title,
          from: res.from,
          to: res.to,
          txnHash: res.hash,
          value: ethers.utils.formatEther(res.value),
          timeStamp: res.timeStamp,
          blockNumber: res.blockNumber
        };
        //Push Data into pasredTransactions Array
        parsedTransactions.push(parsedData);
      } catch (error) {
        return;
      }
    });
    return parsedTransactions;
  }
}

export const web3Controller = new Web3Controller();
