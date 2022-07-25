import React, { useCallback, useMemo, useState } from 'react';
import { Transaction, TransactionsProps } from '../types';
import { Pagination } from './Pagination';
import TableRow from './TableRow';

const tableStyles = {
  header: `px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase`
};

export const Table: React.FC<TransactionsProps> = ({ transactions }) => {
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTransactions, setCurrentTransactions] = useState<any>([]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const memoizedTransactions = useMemo(() => transactions, [transactions]);
  const totalItems = memoizedTransactions?.length;

  const setNewPage = useCallback(() => {
    const index: number = (currentPage - 1) * itemsPerPage;
    console.log(memoizedTransactions?.slice(index, index + itemsPerPage).length);
    const currentItems = memoizedTransactions?.slice(index, index + itemsPerPage);
    setCurrentTransactions(currentItems);
  }, [currentPage, itemsPerPage, memoizedTransactions]);

  React.useEffect(() => {
    setNewPage();
  }, [setNewPage]);

  return (
    <div className="flex flex-col justify-center m-auto mt-10 min-h-screen min-w-[75%]">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className={tableStyles.header}>
                    Txn Hash
                  </th>
                  <th scope="col" className={tableStyles.header}>
                    Method
                  </th>
                  <th scope="col" className={tableStyles.header}>
                    Block
                  </th>
                  <th scope="col" className={tableStyles.header}>
                    Value
                  </th>
                  <th scope="col" className={tableStyles.header}>
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 max-w-full">
                {(currentTransactions as Transaction[])?.map(transaction => (
                  <TableRow transaction={transaction} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        totalItems={totalItems as number}
        pageSize={itemsPerPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
