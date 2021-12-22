export type NumberOrNull = number | null;
export type StringOrNull = string | null;

export enum QuoteMethodType {
  Interchange = 'interchange',
  FlatRate = 'flatRate',
  CashDiscount = 'cashDiscount',
}

export interface KeyObj {
  [key: string]: string;
}

export interface QuotingInputValue {
  interchange: KeyObj;
  flatRate: KeyObj;
  cashDiscount: KeyObj;
}

export interface MerchantQuote {
  effectiveRate: string;
  discountRate: string;
  estSavings: string;
  estProfit: string;
  totalFees: string;
  avgTicket: string;
}
