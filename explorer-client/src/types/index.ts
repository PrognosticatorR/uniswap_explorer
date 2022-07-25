export interface Transaction {
  type: string;
  signature: string;
  title: string;
  from: string;
  to: string;
  value: string;
  txnHash: string;
  timeStamp: string;
  blockNumber: number;
}

export interface TransactionsResponse {
  type: string;
  signature: string;
  title: string;
  from: string;
  to: string;
  value: string;
  txnHash: string;
  timeStamp: number;
  blockNumber: number;
}

export interface TransactionsProps {
  transactions?: Transaction[];
}

export interface ListItemProps {
  transaction: Transaction;
  idx: number;
}
