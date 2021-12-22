import { MerchantCategory, Merchant } from './merchant';
import { MerchantQuote } from './shared';
import { CustomFee } from './auth';

export interface StatementInput {
  documentUrls: string[];
  state: StatementState;
  suggestedMerchantCategoryId: string;
}

export enum StatementState {
  ERROR = 'ERROR',
  IN_PROGRESS = 'IN_PROGRESS',
  QUEUED = 'QUEUED',
  SUCCESS = 'SUCCESS',
}

export enum CcType {
  AMEX = 'AMEX',
  DISCOVER = 'DISCOVER',
  MASTERCARD = 'MASTERCARD',
  OTHER = 'OTHER',
  UNKNOWN = 'UNKNOWN',
  VISA = 'VISA',
}

export interface ParsedFee {
  amount: string;
  ccType: CcType;
  fixedFee: string;
  name: string;
  percentFee: string;
  transactions: number;
  valid: boolean;
}

export interface Statement {
  createdAt: string;
  documentUrls: string[];
  id: string;
  merchant: Merchant;
  merchantQuote: MerchantQuote;
  parsedAddress: string;
  parsedEndPeriod: string;
  parsedMerchantName: string;
  parsedMerchantNumber: string;
  parsedStartPeriod: string;
  parsedTotal: string;
  parsedTotalFees: string;
  parsedInterchangeFees: ParsedFee[];
  parsedProcessingFees: ParsedFee[];
  state: StatementState;
  suggestedMerchantCategory: MerchantCategory;
  transactions: number;
  customFees: CustomFee[];
}
