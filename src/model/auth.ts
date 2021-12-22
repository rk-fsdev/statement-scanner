export enum CustomFeeApplicability {
  ANNUALY = 'ANNUALY',
  MONTHLY = 'MONTHLY',
  PER_NEW_ACCOUNT = 'PER_NEW_ACCOUNT',
  PER_TRANSACTION = 'PER_TRANSACTION',
  QUARTERLY = 'QUARTERLY',
}

export enum CustomFeeType {
  FIXED = 'FIXED',
  PERCENT = 'PERCENT',
}

export interface CustomFee extends CustomFeeInput {
  id: string;
  [key: string]: string;
}

export interface CustomFeeInput {
  amount: string;
  applicability: CustomFeeApplicability;
  name: string;
  type: CustomFeeType;
}

export interface PaymentSetup {
  id: string;
  paymentMethodId: string;
}

export interface Account {
  id: string;
  email: string;
  fixedFee: string;
  name: string;
  percentFee: string;
  paymentSetup: PaymentSetup;
  customFees: CustomFee[];
}

export interface LoginSubmitData {
  token: string;
  account: Account;
}

export interface LoginSubmitVars {
  email: string;
  password: string;
}

export interface AccountCreateInput {
  email: string;
  fixedFee: number;
  name: string;
  password: string;
  percentFee: number;
}

export interface AccountExtraSettingsInput {
  fixedFee: number;
  name: string;
  percentFee: number;
}

export interface AccountEmailInput {
  email: string;
  password: string;
}
