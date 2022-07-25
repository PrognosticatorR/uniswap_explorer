import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import ethLogo from '../assests/eth.png';
import { Transaction } from '../types';
const tableStyles = {
  cell: `px-6 py-4 text-sm text-white-800 whitespace-nowrap`,
  idCeil: `px-6 py-4 text-sm font-medium text-white-800 whitespace-nowrap`,
  etherscanLink: `flex items-center text-[#2172e5]`,
  txDetails: 'flex',
  toAddress: 'px-3',
  ethLogo: 'mr-5'
};

interface TableRowProps {
  transaction: Transaction;
}

const TableRow: React.FC<TableRowProps> = ({ transaction }) => {
  return (
    <tr key={transaction.txnHash}>
      <td className={tableStyles.idCeil}>{transaction.txnHash.slice(0, 15) + '...'}</td>
      <td className={tableStyles.cell}>{transaction.type}</td>
      <td className={tableStyles.cell}>{transaction.blockNumber}</td>
      <td className={tableStyles.cell}>
        <div className={tableStyles.txDetails}>
          <img src={ethLogo} className={tableStyles.ethLogo} height={15} width={15} alt="eth" />
          {transaction?.value && parseFloat(transaction?.value).toFixed(3)} Ξ
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <a
          href={`https://ropsten.etherscan.io/tx/${transaction.txnHash}`}
          target="_blank"
          rel="noreferrer"
          className={tableStyles.etherscanLink}
        >
          View on Etherscan
          <FiArrowUpRight />
        </a>
      </td>
    </tr>
  );
};

export default TableRow;
