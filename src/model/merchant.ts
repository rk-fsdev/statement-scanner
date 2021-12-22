export interface Merchant {
  address: string;
  businessName: string;
  id: string;
  merchantCategory: MerchantCategory;
  number: number;
  ownerEmail: string;
  ownerName: string;
  onwerPhone: string;
}

export interface MerchantCategory {
  id: string;
  code: string;
  name: string;
}

export interface MerchantCategoryGroup {
  id: string;
  name: string;
  merchantCategories?: MerchantCategory[];
}

export interface MerchantQuote {
  avgTicket: number;
  discountRate: number;
  effectiveRate: number;
  estProfit: number;
  estSavings: number;
  totalFees: number;
}
