import React, { useContext } from 'react';
import { Box, BoxProps, Button } from '@chakra-ui/core';
import Credits from './Credits';
import Costs from './Costs';
import { useQuery, useMutation } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { GET_ME } from 'services/graphql/auth/queries';
import LoadingSpinner from 'components/loading/LoadingSpinner';
import { CustomFee, Account, CustomFeeInput } from 'model/auth';
import { CustomFeeBlock, CustomFeesForm } from 'components/shared';
import {
  ACCOUNT_CUSTOM_FEE_CREATE,
  ACCOUNT_CUSTOM_FEE_DELETE,
} from 'services/graphql/auth/mutations';
import EditUserInfo from './EditUserInfo';
import { submitButtonProps } from 'components/buttons/buttonProps';
import { BlockContainer, BlockHeader, BlockBody } from 'components/grid';
import { useHistory } from 'react-router-dom';
import { AppContext, AppActionTypes } from 'services/context/appContext';
import PaymentMethod from './PaymentMethod';

interface Props extends BoxProps {
  children?: React.ReactNode | React.ReactNode[];
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const Profile: React.FC<Props> = ({ ...restProps }: Props) => {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);

  const { loading, data: userData, error, refetch } = useQuery<{ me: Account }, null>(GET_ME, {
    variables: null,
  });

  const [accountCustomFeeCreate] = useMutation<
    { accountCustomFeeCreate: CustomFee },
    { input: CustomFeeInput }
  >(ACCOUNT_CUSTOM_FEE_CREATE);
  const [accountCustomFeeDelete] = useMutation<
    { accountCustomFeeDelete: CustomFee },
    { id: string }
  >(ACCOUNT_CUSTOM_FEE_DELETE);

  const handleSubmit = async (customFeeInput: CustomFeeInput) => {
    try {
      await accountCustomFeeCreate({
        variables: {
          input: customFeeInput,
        },
      });
      await refetch();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleCustomFeeClose = async (id: string) => {
    try {
      await accountCustomFeeDelete({
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

  const handleSignOutClick = () => {
    window.localStorage.clear();
    dispatch({
      type: AppActionTypes.SET_AUTHENTICATED,
      payload: {
        isAuthenticated: false,
      },
    });
    history.push('/');
  };

  const renderCustomFees = () => {
    if (userData && userData.me) {
      const { customFees } = userData.me;
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

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Failed to load profile</div>;

  return (
    <Box {...restProps}>
      <Credits count={2} />
      <Costs marginTop="10px" />
      <CustomFeesForm
        title="Add custom fees"
        page="profile"
        submit={handleSubmit}
        marginTop="10px"
      />
      {renderCustomFees()}
      <EditUserInfo marginTop="10px" />
      <Elements stripe={stripePromise}>
        <PaymentMethod
          isAlreadyAttached={
            !!(
              userData &&
              userData.me &&
              userData.me.paymentSetup &&
              userData.me.paymentSetup.paymentMethodId
            )
          }
          marginTop="10px"
          refetchProfile={refetch}
        />
      </Elements>
      <BlockContainer marginTop="10px">
        <BlockHeader title="Sign Out" />
        <BlockBody>
          <Button {...submitButtonProps} type="button" onClick={handleSignOutClick}>
            Sign out
          </Button>
        </BlockBody>
      </BlockContainer>
    </Box>
  );
};

export default Profile;
