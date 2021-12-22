import React from 'react';
import { BoxProps, Box, Text } from '@chakra-ui/core';

import { QuoteMethodType, QuotingInputValue } from 'model/shared';
import { grayDescTextProps } from 'components/text/textProps';
import DividedInput from 'components/inputs/DividedInput';
import { NamedDivider } from 'components/grid';
import { getStyledFee } from 'utils/shared';

interface Props extends BoxProps {
  type: QuoteMethodType;
  values: QuotingInputValue;
  setValues: React.Dispatch<React.SetStateAction<QuotingInputValue>>;
}

const EditQuote: React.FC<Props> = ({ type, values, setValues, ...restProps }: Props) => {
  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    if (parseFloat(value)) {
      let styledFee = getStyledFee(value);
      const lowerCasedName = name.toLowerCase();
      if (lowerCasedName.includes('percentfee')) {
        if (styledFee > 100) {
          styledFee = parseFloat(values[type][name]);
        }
      }
      if (lowerCasedName.includes('profittarget') || lowerCasedName.includes('savingstarget')) {
        setValues({
          ...values,
          [type]: {
            [name]: styledFee.toFixed(2),
          },
        });
      } else
        setValues({
          ...values,
          [type]: {
            ...values[type],
            [name]: styledFee.toFixed(2),
            monthlyProfitTarget: '0.00',
            monthlySavingsTarget: '0.00',
          },
        });
    } else {
      setValues({
        ...values,
        [type]: {
          ...values[type],
          [name]: '0.00',
        },
      });
    }
  };

  const returnDescText = (quoteMethodType: QuoteMethodType): string => {
    let desc = '';
    switch (quoteMethodType) {
      case QuoteMethodType.Interchange:
        desc =
          'Enter a Monthly Profit Target, Merchant Monthly Savings Target, or a Interchange+ rates for all transactions:';
        break;
      case QuoteMethodType.FlatRate:
        desc = 'Flat rate for all transactions';
        break;
      case QuoteMethodType.CashDiscount:
        desc = 'Cash Discount';
        break;
    }
    return desc;
  };

  return (
    <Box {...restProps}>
      <Text {...grayDescTextProps} marginTop="10px">
        {returnDescText(type)}
      </Text>
      <DividedInput
        description="Monthly Revenue Target"
        dividedSuffix="$-"
        type="number"
        name={`monthlyProfitTarget`}
        onChange={handleInputChange}
        value={values[type].monthlyProfitTarget || '0.00'}
        inputId={`edit_month_profit_${type}`}
      />
      <NamedDivider
        text="or"
        marginTop="20px"
        marginBottom="20px"
        backgroundColor="white"
        margin="10px 0px"
      />
      <DividedInput
        description="Monthly Savings Target"
        dividedSuffix="$-"
        type="number"
        name={`monthlySavingsTarget`}
        onChange={handleInputChange}
        value={values[type].monthlySavingsTarget || '0.00'}
        inputId={`edit_month_savings_${type}`}
      />
      <NamedDivider
        text="or"
        marginTop="20px"
        marginBottom="20px"
        backgroundColor="white"
        margin="10px 0px"
      />
      <DividedInput
        description="% Fee Per Transaction"
        dividedSuffix="-%"
        type="number"
        name={`percentFeePerTransaction`}
        onChange={handleInputChange}
        value={values[type].percentFeePerTransaction || '0.00'}
        inputId={`edit_percentFee_${type}`}
        step={0.01}
      />
      {type === QuoteMethodType.Interchange && (
        <DividedInput
          description="$ Fee Per Transaction"
          dividedSuffix="$-"
          type="number"
          name={`fixedFeePerTransaction`}
          onChange={handleInputChange}
          value={values[type].fixedFeePerTransaction || '0.00'}
          inputId={`edit_fixedFee_${type}`}
        />
      )}
    </Box>
  );
};

export default EditQuote;
