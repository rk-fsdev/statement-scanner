import { StatementState, Statement, ParsedFee } from 'model/statement';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const getTextFromState = (statement: Statement): string => {
  switch (statement.state) {
    case StatementState.ERROR:
      return 'Cannot be processed.';
    case StatementState.QUEUED:
      return 'Analyzing';
    case StatementState.IN_PROGRESS:
      return 'Processing';
    case StatementState.SUCCESS:
      return new Date(statement.parsedStartPeriod).toDateString();
    default:
      return 'Uploading';
  }
};

export const getFormattedCurrency = (amount: number): string => {
  return formatter.format(amount);
};

export const calcParsedIFeeSum = (fees: ParsedFee[]): number => {
  let sum = 0;
  fees.forEach(({ percentFee, amount, transactions, fixedFee }) => {
    sum +=
      (parseFloat(amount) * parseFloat(percentFee)) / 100 + transactions * parseFloat(fixedFee);
  });
  return sum;
};

export const calcParsedPFeeSum = (fees: ParsedFee[]): number => {
  let sum = 0;
  fees.forEach(({ percentFee, amount, transactions, fixedFee }) => {
    let value = 0;
    if (fixedFee) value = transactions * parseFloat(fixedFee);
    else if (percentFee) value = (parseFloat(amount) * parseFloat(percentFee)) / 100;
    sum += value;
  });
  return sum;
};
