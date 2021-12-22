import React, { useState } from 'react';
import { Text, Input, BoxProps, Button } from '@chakra-ui/core';

import { BlockContainer, BlockBody, BlockHeader } from 'components/grid';
import { grayDescTextProps } from 'components/text/textProps';
import { grayInputProps } from 'components/inputs/inputProps';
import { useMutation } from '@apollo/client';
import { AccountEmailInput, Account } from 'model/auth';
import { ACCOUNT_EMAIL_UPDATE } from 'services/graphql/auth/mutations';
import { submitButtonProps } from 'components/buttons/buttonProps';

const EditUserInfo: React.FC<BoxProps> = ({ ...restProps }: BoxProps) => {
  const [userInput, setUserInput] = useState<AccountEmailInput>({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const [accountEmailUpdate] = useMutation<
    { accountEmailUpdate: Account },
    { input: AccountEmailInput }
  >(ACCOUNT_EMAIL_UPDATE);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await accountEmailUpdate({
        variables: {
          input: userInput,
        },
      });
      console.log(response);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlockContainer {...restProps}>
      <BlockHeader title="Reset Email & Password" />
      <BlockBody>
        <form onSubmit={handleSubmit}>
          <Text {...grayDescTextProps}>Email</Text>
          <Input
            onChange={handleInputChange}
            placeholder="Enter your new email address"
            {...grayInputProps}
            padding="10px 20px"
            name="email"
            type="email"
            isRequired
            value={userInput.email}
          />
          <Text {...grayDescTextProps}>Password</Text>
          <Input
            onChange={handleInputChange}
            placeholder="Enter your current password"
            {...grayInputProps}
            padding="10px 20px"
            name="password"
            type="password"
            isRequired
            value={userInput.password}
          />
          <Button {...submitButtonProps} isLoading={loading}>
            Update
          </Button>
        </form>
      </BlockBody>
    </BlockContainer>
  );
};

export default EditUserInfo;
