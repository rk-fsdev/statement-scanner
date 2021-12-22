import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/core';

import LoadingSpinner from 'components/loading/LoadingSpinner';
import StatementBlock from './StatementBlock';
import { STATEMENTS_ALL } from 'services/graphql/statement/queries';
import { Statement } from 'model/statement';

const StatementPage: React.FC = () => {
  const [statements, setStatements] = useState<Statement[]>([]);
  const { data, error, loading } = useQuery<{ statements: Statement[] }>(STATEMENTS_ALL, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data && data.statements) setStatements(data.statements);
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Something goes wrong</div>;
  return <Box>{statements && <StatementBlock data={statements} />}</Box>;
};

export default StatementPage;
