import React, { useState } from 'react';

import SearchBar from './SearchBar';
import { Box, Text } from '@chakra-ui/core';
import { useQuery } from '@apollo/client';
import { Statement } from 'model/statement';
import { STATEMENTS_ALL } from 'services/graphql/statement/queries';
import LoadingSpinner from 'components/loading/LoadingSpinner';
import { StatementList } from 'components/shared';
import { BlockContainer, BlockBody, BlockHeader } from 'components/grid';

const Mids: React.FC = () => {
  const [midInput, setMidInput] = useState<string>('');
  const [filteredStmts, setFilteredStmts] = useState<Statement[]>([]);

  const { data, error, loading } = useQuery<{ statements: Statement[] }>(STATEMENTS_ALL);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setMidInput(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data && data.statements) {
      const stmts = data.statements.filter(
        (stmt) =>
          stmt.parsedMerchantNumber && stmt.parsedMerchantNumber.toLowerCase().includes(midInput)
      );
      setFilteredStmts(stmts);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Cannot fetch statements</div>;

  return (
    <Box>
      <SearchBar value={midInput} onChange={handleInputChange} handleSubmit={handleSubmit} />
      <BlockContainer marginTop="10px">
        <BlockHeader title="Search Results:" />
        <BlockBody>
          <Box>
            <Text as="p" fontSize="md">
              <Text as="span">{filteredStmts.length}</Text>&nbsp;
              <Text as="span">search result{filteredStmts.length >= 2 && 's'}</Text>
            </Text>
          </Box>
          <StatementList data={filteredStmts} descIfNo="" />
        </BlockBody>
      </BlockContainer>
    </Box>
  );
};

export default Mids;
