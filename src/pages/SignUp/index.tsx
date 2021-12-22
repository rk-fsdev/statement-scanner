import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Heading,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/core';
import { greenButtonProps, linkButtonProps } from 'components/buttons/buttonProps';
import { grayInputProps } from 'components/inputs/inputProps';
import { loginSignUpContainerProps } from 'components/grid/boxProps';
import { LoginSubmitVars, AccountCreateInput, LoginSubmitData } from 'model/auth';
import { useMutation } from '@apollo/client';
import { ACCOUNT_CREATE } from 'services/graphql/auth/mutations';
import { AppContext, AppActionTypes } from 'services/context/appContext';

const SignUp: React.FC = () => {
  const history = useHistory();
  const [formData, setFormData] = useState<LoginSubmitVars>({ email: '', password: '' });
  const [signUpSubmit, { error, loading: signUpLoading }] = useMutation<
    { accountCreate: LoginSubmitData },
    { input: AccountCreateInput }
  >(ACCOUNT_CREATE);
  const { dispatch } = useContext(AppContext);

  // const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  //   console.log(response);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUpLoading) return;
    try {
      const { data } = await signUpSubmit({
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
            fixedFee: 0,
            percentFee: 0,
            name: formData.email,
          },
        },
      });
      if (data) {
        dispatch({ type: AppActionTypes.SET_AUTHENTICATED, payload: { isAuthenticated: true } });
        localStorage.setItem('token', data.accountCreate.token);
        history.push('/mids');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prevFormData: LoginSubmitVars) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  return (
    <Box {...loginSignUpContainerProps}>
      <Heading as="h1" fontSize="lg" lineHeight="1" marginBottom="32px">
        Sign Up
      </Heading>
      {/* <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <GoogleButton onClick={renderProps.onClick} isDisabled={renderProps.disabled}>
            Sign up with Google
          </GoogleButton>
        )}
      />
      <NamedDivider text="or" marginTop="20px" marginBottom="20px" backgroundColor="background" /> */}
      {error &&
        error.graphQLErrors.map(({ message }, i) => (
          <Alert status="error" width="100%" margin="10px 0px" key={i}>
            <AlertIcon />
            <AlertDescription mr={2}>{message}</AlertDescription>
          </Alert>
        ))}
      <FormControl width="100%" textAlign="right">
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Username or Email"
            marginBottom="15px"
            isRequired
            name="email"
            onChange={handleChange}
            value={formData.email}
            {...grayInputProps}
          />
          <Input
            type="password"
            placeholder="Password"
            isRequired
            name="password"
            onChange={handleChange}
            value={formData.password}
            {...grayInputProps}
          />
          <Box d="flex" marginTop="20px" justifyContent="flex-end" alignItems="center">
            <Text fontSize="sm" color="gray.250" lineHeight="1" marginRight="5px">
              Already have an account?
            </Text>
            <Button
              fontSize="sm"
              color="green.500"
              onClick={() => history.push('/login')}
              {...linkButtonProps}
            >
              Log In
            </Button>
          </Box>
          <Button
            type="submit"
            width="100%"
            fontSize="sm"
            lineHeight="1"
            marginTop="20px"
            isLoading={signUpLoading}
            {...greenButtonProps}
          >
            Sign Up
          </Button>
        </form>
      </FormControl>
    </Box>
  );
};

export default SignUp;
