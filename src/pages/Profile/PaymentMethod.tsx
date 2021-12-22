import React, { useEffect, useState } from 'react';
import { BoxProps, Text, Checkbox, Button, Input, Box } from '@chakra-ui/core';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useMutation, ApolloQueryResult } from '@apollo/client';

import { BlockContainer, BlockHeader, BlockBody } from 'components/grid';
import { grayInputProps } from 'components/inputs/inputProps';
import {
  PAYMENT_SETUP_INTENT_CREATE,
  PAYMENT_METHOD_CREATE,
} from 'services/graphql/payment/mutation';
import { PaymentSetupIntent } from 'model/payment';
import theme from 'styles/theme';
import { Account } from 'model/auth';

interface Props extends BoxProps {
  children?: any;
  isAlreadyAttached: boolean;
  refetchProfile: (
    variables?: null | undefined
  ) => Promise<
    ApolloQueryResult<{
      me: Account;
    }>
  >;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      marginTop: '10px',
      height: '50px',
      color: theme.colors.green[500],
      fontFamily: 'Avenir',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: 'customGray.700',
      },
    },
    invalid: {
      color: 'red',
      iconColor: '#fa755a',
    },
  },
};

const PaymentMethod: React.FC<Props> = ({
  isAlreadyAttached,
  refetchProfile,
  ...restProps
}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [paymentSetupIntentCreate] = useMutation<{ paymentSetupIntentCreate: PaymentSetupIntent }>(
    PAYMENT_SETUP_INTENT_CREATE
  );
  const [paymentMethodCreate] = useMutation<null, { input: { paymentMethodId: string } }>(
    PAYMENT_METHOD_CREATE
  );
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function callMutation() {
      try {
        const { data } = await paymentSetupIntentCreate();
        if (data && data.paymentSetupIntentCreate) {
          setClientSecret(data.paymentSetupIntentCreate.clientSecret);
        }
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    }
    callMutation();
  }, [paymentSetupIntentCreate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    const getCardElement = elements.getElement(CardElement);
    if (getCardElement !== null) {
      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: getCardElement,
          billing_details: {
            name,
          },
        },
      });
      if (result.error) {
        console.log(result.error);
        alert(result.error.message);
      } else {
        if (result.setupIntent && result.setupIntent.payment_method) {
          try {
            await paymentMethodCreate({
              variables: {
                input: {
                  paymentMethodId: result.setupIntent.payment_method,
                },
              },
            });
            alert('Successfully attached');
            refetchProfile();
          } catch (e) {
            console.log(e);
            alert(e.message);
          }
        } else {
          console.log(result);
          alert('Cannot add payment method due to Stripe setupIntent');
        }
      }
    }
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAccepted(event.currentTarget.checked);
  };

  return (
    <BlockContainer {...restProps}>
      <BlockHeader title="Payment method" />
      <BlockBody>
        {isAlreadyAttached ? (
          <Text as="p" fontSize="sm">
            Payment method is already attached
          </Text>
        ) : (
          <form onSubmit={handleSubmit}>
            <Text as="p" fontSize="sm">
              Cardholder Name
            </Text>
            <Input {...grayInputProps} marginTop="5px" onChange={handleInputChange} isRequired />
            <Box marginTop="10px" fontSize="sm">
              <label>
                Card details
                <CardElement options={CARD_ELEMENT_OPTIONS} />
              </label>
            </Box>
            <Checkbox marginTop="20px" isChecked={isAccepted} onChange={handleCheckBoxChange}>
              <Text fontSize="sm">I have read and accept the terms of use and privacy policy.</Text>
            </Checkbox>
            <Button
              variantColor="green"
              variant="solid"
              width="100%"
              marginTop="10px"
              type="submit"
              isDisabled={!isAccepted}
            >
              Add Payment Method
            </Button>
          </form>
        )}
      </BlockBody>
    </BlockContainer>
  );
};

export default PaymentMethod;
