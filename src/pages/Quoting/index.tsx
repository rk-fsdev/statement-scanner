import React, { ReactNode, useState, useEffect } from 'react';
import { BoxProps, Box } from '@chakra-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { Statement, StatementState } from 'model/statement';
import { STATEMENT_BY_ID } from 'services/graphql/statement/queries';
import LoadingSpinner from 'components/loading/LoadingSpinner';
import IdBlock from 'pages/Analysis/IdBlock';
import QuoteAnalysis from './QuoteAnalysis';
import QuotingMethod from './QuotingMethod';
import { QuoteMethodType, QuotingInputValue } from 'model/shared';
import { CustomFee, CustomFeeInput, Account } from 'model/auth';
import { CustomFeesForm, CustomFeeBlock } from 'components/shared';
import {
  STATEMENT_CUSTOM_FEE_CREATE,
  STATEMENT_CUSTOM_FEE_DELETE,
} from 'services/graphql/statement/mutation';
import { GET_ME } from 'services/graphql/auth/queries';

interface Props extends BoxProps {
  children?: ReactNode | ReactNode[];
}

const initialInputValues: QuotingInputValue = {
  interchange: {},
  flatRate: {},
  cashDiscount: {},
};

const Quoting: React.FC<Props> = ({ ...restProps }: Props) => {
  const { id } = useParams();
  const history = useHistory();

  const [statement, setStatement] = useState<Statement>();
  const [quotingMethod, setQuotingMethod] = useState<QuoteMethodType>(QuoteMethodType.Interchange);
  const [inputValues, setInputValues] = useState<QuotingInputValue>(initialInputValues);

  const { data, loading, refetch } = useQuery<{ statement: Statement }, { id: string }>(
    STATEMENT_BY_ID,
    {
      variables: { id },
    }
  );
  const { data: userData, loading: profileLoading } = useQuery<{ me: Account }, null>(GET_ME, {
    variables: null,
  });
  const [statementCustomFeeCreate] = useMutation<
    { statementCustomFeeCreate: CustomFee },
    { input: CustomFeeInput; statementId: string }
  >(STATEMENT_CUSTOM_FEE_CREATE);
  const [statementCustomFeeDelete] = useMutation<
    { statementCustomFeeDelete: CustomFee },
    { id: string }
  >(STATEMENT_CUSTOM_FEE_DELETE);

  useEffect(() => {
    if (data && data.statement) {
      if (data.statement.state === StatementState.QUEUED) {
        history.push('/statements');
      } else {
        setStatement(data.statement);
      }
    }
  }, [data, history]);

  const handleCustomFeeClose = async (id: string) => {
    try {
      await statementCustomFeeDelete({
        variables: {
          id,
        },
      });
      await refetch();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  const handleSubmit = async (customFeeInput: CustomFeeInput) => {
    if (statement) {
      try {
        await statementCustomFeeCreate({
          variables: {
            input: customFeeInput,
            statementId: statement.id,
          },
        });
        await refetch();
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    }
  };

  const renderCustomFees = () => {
    if (statement) {
      const { customFees } = statement;
      return customFees.map((customFee: CustomFee) => (
        <CustomFeeBlock
          data={customFee}
          key={customFee.id}
          marginTop="10px"
          onClose={handleCustomFeeClose}
        />
      ));
    }
  };

  if (loading || profileLoading) return <LoadingSpinner />;

  return (
    <Box {...restProps}>
      {statement && userData && userData.me && (
        <>
          {statement.parsedMerchantNumber && (
            <IdBlock
              id={statement.parsedMerchantNumber}
              businessName={statement.parsedMerchantName}
              address={statement.parsedAddress}
            />
          )}
          <QuoteAnalysis
            data={statement}
            quotingMethod={quotingMethod}
            inputValues={inputValues}
            account={userData.me}
            marginTop="10px"
          />
          <QuotingMethod
            setQuotingMethod={setQuotingMethod}
            quotingMethod={quotingMethod}
            inputValues={inputValues}
            setInputValues={setInputValues}
            marginTop="10px"
          />
          <CustomFeesForm
            title="Add custom fees (optional)"
            page="quoting"
            submit={handleSubmit}
            marginTop="10px"
          />
          {renderCustomFees()}
        </>
      )}
    </Box>
  );
};

export default Quoting;
