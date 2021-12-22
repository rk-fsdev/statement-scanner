import React from 'react';
import { Skeleton } from '@chakra-ui/core';

const LoadingSpinner: React.FC = () => {
  return (
    <div>
      <Skeleton height="20px" my="10px" />
      <Skeleton height="20px" my="10px" />
      <Skeleton height="20px" my="10px" />
    </div>
  );
};

export default LoadingSpinner;
