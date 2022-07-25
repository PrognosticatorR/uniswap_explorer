import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Transaction } from '../types/index';
import { Table } from './Table';
import TransactionLoader from './TransactionLoader';

const style = {
  wrapper: `h-full text-white select-none h-full w-screen flex-1 flex items-end justify-end pb-12 overflow-scroll px-8`,
  txHistoryItem: `bg-[#191a1e] rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
  txDetails: `flex items-center`,
  toAddress: `text-[#f48706] mx-2`,
  txTimestamp: `mx-2`,
  etherscanLink: `flex items-center text-[#2172e5]`
};

const TransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const { data, fetchingData, error } = useFetch('/api');

  useEffect(() => {
    if (data && !fetchingData && !error) {
      setTransactionHistory(data);
    }
  }, [data, fetchingData, error]);

  return (
    <div className={style.wrapper}>
      {fetchingData ? <TransactionLoader /> : <Table transactions={transactionHistory} />}
    </div>
  );
};

export default TransactionHistory;
