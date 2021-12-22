import React, { useState, useEffect } from 'react';
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
import { useMutation } from '@apollo/client';

import { greenButtonProps, linkButtonProps } from 'components/buttons/buttonProps';
import { grayInputProps } from 'components/inputs/inputProps';
import { LOGIN_SUBMIT } from 'services/graphql/auth/mutations';
import { LoginSubmitData, LoginSubmitVars } from 'model/auth';
import { AppContext, AppActionTypes } from 'services/context/appContext';
import { loginSignUpContainerProps } from 'components/grid/boxProps';
import LoadingSpinner from 'components/loading/LoadingSpinner';

const LoginContainer: React.FC = () => {
  const history = useHistory();
  const [loginSubmit, { error, loading: loginLoading }] = useMutation<
    { logIn: LoginSubmitData },
    LoginSubmitVars
  >(LOGIN_SUBMIT);
  const [formData, setFormData] = useState<LoginSubmitVars>({ email: '', password: '' });
  const { state, dispatch } = React.useContext(AppContext);
  const { isAuthenticated } = state;

  useEffect(() => {
    if (isAuthenticated) history.push('/mids');
  }, [history, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await loginSubmit({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
      if (data) {
        dispatch({ type: AppActionTypes.SET_AUTHENTICATED, payload: { isAuthenticated: true } });
        localStorage.setItem('token', data.logIn.token);
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

  // const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  //   console.log(response);
  // };

  if (loginLoading || isAuthenticated) return <LoadingSpinner />;

  return (
    <Box {...loginSignUpContainerProps}>
      <Heading as="h1" fontSize="lg" lineHeight="1" marginBottom="32px">
        Log In
      </Heading>
      {/* <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <GoogleButton onClick={renderProps.onClick} isDisabled={renderProps.disabled}>
            Log in with Google
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
          <Button color="gray.300" fontSize="sm" marginTop="20px" {...linkButtonProps}>
            Forgot Password?
          </Button>
          <Button
            type="submit"
            width="100%"
            fontSize="sm"
            lineHeight="1"
            marginTop="20px"
            {...greenButtonProps}
          >
            Log In
          </Button>
        </form>
      </FormControl>
      <Box d="flex" marginTop="20px" justifyContent="center" alignItems="center">
        <Text fontSize="sm" color="gray.250" lineHeight="1" marginRight="5px">
          Don&apos;t have an account?
        </Text>
        <Button
          fontSize="sm"
          color="green.500"
          onClick={() => history.push('/sign-up')}
          {...linkButtonProps}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default LoginContainer;
