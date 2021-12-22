import { QuoteMethodType, MerchantQuote } from 'model/shared';
import { CustomFee, CustomFeeType, CustomFeeApplicability } from 'model/auth';

export const calcQuote = (
  quotingMethod: QuoteMethodType,
  parsedTotalFees: number,
  percentFeePerTransaction: number,
  fixedFeePerTransaction: number,
  profilePercentFee: number,
  profileFixedFee: number,
  transactions: number,
  parsedTotal: number,
  customFeeNAmount: number,
  profileCustomFeeNAmount: number,
  monthlySavingsTarget: number,
  monthlyProfitTarget: number,
  parsedInterchangeFeeSum: number
): MerchantQuote => {
  let estEffectiveRate = 0,
    estSavings = 0,
    estProfit = 0,
    estTotalFees = 0;
  const discountRate = 0;
  const avgTicket = parsedTotal / transactions;
  switch (quotingMethod) {
    case QuoteMethodType.Interchange:
      if (monthlySavingsTarget)
        estTotalFees = parsedTotalFees - (monthlySavingsTarget - customFeeNAmount);
      else if (monthlyProfitTarget) estTotalFees = monthlyProfitTarget + customFeeNAmount;
      else
        estTotalFees =
          (parsedTotal * fixedFeePerTransaction) / 100 +
          transactions * fixedFeePerTransaction +
          customFeeNAmount;
      estProfit =
        (parsedTotal * percentFeePerTransaction) / 100 +
        transactions * fixedFeePerTransaction +
        customFeeNAmount -
        ((parsedTotal * profilePercentFee) / 100 +
          transactions * profileFixedFee +
          profileCustomFeeNAmount);
      estSavings =
        parsedTotalFees -
        parsedInterchangeFeeSum -
        ((parsedTotal * percentFeePerTransaction) / 100 +
          transactions * fixedFeePerTransaction +
          customFeeNAmount);
      break;
    case QuoteMethodType.FlatRate:
      if (monthlySavingsTarget)
        estTotalFees = parsedTotalFees - (monthlySavingsTarget - customFeeNAmount);
      else if (monthlyProfitTarget) estTotalFees = monthlyProfitTarget + customFeeNAmount;
      else estTotalFees = (parsedTotal * percentFeePerTransaction) / 100 + customFeeNAmount;
      estProfit =
        (parsedTotal * percentFeePerTransaction) / 100 +
        customFeeNAmount -
        ((parsedTotal * profilePercentFee) / 100 +
          transactions * profileFixedFee +
          profileCustomFeeNAmount);
      estSavings =
        (parsedTotal * percentFeePerTransaction) / 100 + customFeeNAmount - parsedTotalFees;
      break;
    case QuoteMethodType.CashDiscount:
      if (monthlySavingsTarget) estTotalFees = monthlySavingsTarget - customFeeNAmount;
      else if (monthlyProfitTarget) estTotalFees = customFeeNAmount;
      else estTotalFees = customFeeNAmount;
      estSavings = parsedTotalFees - customFeeNAmount;
      estProfit =
        (parsedTotal * percentFeePerTransaction) / 100 -
        parsedInterchangeFeeSum +
        customFeeNAmount -
        ((parsedTotal * profilePercentFee) / 100 +
          transactions * profileFixedFee +
          profileCustomFeeNAmount);
      break;
  }

  if (monthlyProfitTarget) {
    estProfit =
      monthlyProfitTarget +
      customFeeNAmount -
      ((parsedTotal * profilePercentFee) / 100 +
        transactions * profileFixedFee +
        profileCustomFeeNAmount);
    estSavings =
      parsedTotalFees - parsedInterchangeFeeSum - (monthlyProfitTarget + customFeeNAmount);
  }
  if (monthlySavingsTarget) {
    estProfit =
      parsedTotalFees -
      parsedInterchangeFeeSum -
      monthlySavingsTarget +
      customFeeNAmount -
      ((parsedTotal * profilePercentFee) / 100 +
        transactions * profileFixedFee +
        profileCustomFeeNAmount);
    estSavings = monthlySavingsTarget - customFeeNAmount;
  }
  estEffectiveRate = (estTotalFees / parsedTotal) * 100;

  return {
    estProfit: estProfit.toFixed(2),
    estSavings: estSavings.toFixed(2),
    discountRate: discountRate.toFixed(2),
    effectiveRate: estEffectiveRate.toFixed(2),
    totalFees: estTotalFees.toFixed(2),
    avgTicket: avgTicket.toFixed(2),
  };
};

export const computeCustomFeeProRated = (
  customFees: CustomFee[],
  parsedTotal: number,
  transactions: number
): number => {
  const total = customFees.reduce((acc: number, cur: CustomFee) => {
    const amountNumber = parseFloat(cur.amount);
    if (cur.type === CustomFeeType.FIXED) {
      switch (cur.applicability) {
        case CustomFeeApplicability.MONTHLY:
          return acc + amountNumber;
        case CustomFeeApplicability.QUARTERLY:
          return acc + amountNumber / 3;
        case CustomFeeApplicability.ANNUALY:
          return acc + amountNumber / 12;
        case CustomFeeApplicability.PER_NEW_ACCOUNT:
          return acc + amountNumber;
        case CustomFeeApplicability.PER_TRANSACTION:
          return acc + amountNumber * transactions;
        default:
          return acc;
      }
    } else {
      switch (cur.applicability) {
        case CustomFeeApplicability.MONTHLY:
          return acc + (amountNumber * parsedTotal) / 100;
        case CustomFeeApplicability.QUARTERLY:
          return acc + (amountNumber * parsedTotal) / 100 / 3;
        case CustomFeeApplicability.ANNUALY:
          return acc + (amountNumber * parsedTotal) / 100 / 12;
        case CustomFeeApplicability.PER_NEW_ACCOUNT:
          return acc + (amountNumber * parsedTotal) / 100 / 12;
        case CustomFeeApplicability.PER_TRANSACTION:
          return acc + (amountNumber * parsedTotal) / 100;
        default:
          return acc;
      }
    }
  }, 0);
  return total;
};
