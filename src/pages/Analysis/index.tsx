import React, { useEffect, useState } from 'react';
import { BoxProps, Box } from '@chakra-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import AnalysisBlock from './AnalysisBlock';
import SuspiciousFeesBlock from './SuspiciousFeesBlock';
import { Statement, StatementState } from 'model/statement';
import LoadingSpinner from 'components/loading/LoadingSpinner';
import IdBlock from './IdBlock';
import { STATEMENT_BY_ID } from 'services/graphql/statement/queries';

interface Props extends BoxProps {
  children?: any;
}

const AnalysisPage: React.FC<Props> = ({ ...restProps }: Props) => {
  const { id } = useParams();
  const history = useHistory();
  const [statement, setStatement] = useState<Statement>();

  const { data, loading, refetch } = useQuery<{ statement: Statement }, { id: string }>(
    STATEMENT_BY_ID,
    {
      variables: { id },
    }
  );

  // const { data, loading } = useSubscription<{ statementUpdated: Statement }, { id: string }>(
  //   STATEMENT_UPDATE,
  //   { variables: { id } }
  // );

  useEffect(() => {
    if (data && data.statement) {
      setStatement(data.statement);
      if (data.statement.state === StatementState.QUEUED) refetch();
    }
  }, [data, refetch]);

  const goBack = () => {
    history.push(`/statements`);
  };

  console.log(data);

  if (loading) return <LoadingSpinner />;

  // let statement = null;
  // if (data && data.statementUpdated) {
  //   statement = data.statementUpdated;
  // }

  return (
    <Box {...restProps}>
      {!statement && <div>Statement does not exist.</div>}
      {statement && (
        <>
          {statement.parsedMerchantNumber && (
            <IdBlock
              id={statement.parsedMerchantNumber}
              businessName={statement.parsedMerchantName}
              address={statement.parsedAddress}
            />
          )}
          <AnalysisBlock goBack={goBack} data={statement} marginTop="10px" />
          <SuspiciousFeesBlock
            marginTop="10px"
            data={statement}
            description="We found the following suspicious fees:"
          />
        </>
      )}
    </Box>
  );
};

export default AnalysisPage;
