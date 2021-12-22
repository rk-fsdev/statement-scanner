import React, { useContext, useEffect, useState } from 'react';
import { BoxProps, Box, RadioButtonGroup, Button } from '@chakra-ui/core';

import AuthenticatedContainer from './AuthenticatedContainer';
import theme from 'styles/theme';
import { CustomRadio } from 'components/buttons';
import { MdSearch } from 'react-icons/md';
import { AiFillFile, AiFillCalculator } from 'react-icons/ai';
import { FaUserCircle, FaPlus } from 'react-icons/fa';
import { AppContext, AppActionTypes } from 'services/context/appContext';
import { MerchantCategoryGroupSelection } from 'components/modal';
import { useHistory, useLocation } from 'react-router-dom';

const NavBar: React.FC<BoxProps> = ({ ...restProps }: BoxProps) => {
  const history = useHistory();
  const location = useLocation();
  const [defaultValue, setDefaultValue] = useState<string>('mids');
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (location.pathname.startsWith('/statements')) setDefaultValue('statements');
    else if (location.pathname.startsWith('/mids')) setDefaultValue('mids');
    else if (location.pathname.startsWith('/profile')) setDefaultValue('profile');
    else if (location.pathname.startsWith('/quoting')) setDefaultValue('quoting');
  }, [location.pathname, location]);

  const handleClick = () => {
    dispatch({
      type: AppActionTypes.SET_MODAL_CONTENT,
      payload: {
        modalTitle: 'Upload New Statement',
        modalContent: MerchantCategoryGroupSelection,
      },
    });
  };

  const handleChange = (value: string | number | undefined) => {
    if (typeof value === 'string') {
      history.push(`/${value}`);
    }
  };

  return (
    <AuthenticatedContainer>
      <Box
        width="100%"
        maxW="md"
        position="absolute"
        bottom="0px"
        left="50%"
        transform="translateX(-50%)"
        background="white"
        boxShadow="0 -3px 20px 0 rgba(45, 45, 45, 0.14)"
        padding="0px 35px"
        height={theme.height.navbar.xs}
        zIndex={1}
        {...restProps}
      >
        <Box
          width="60px"
          height="60px"
          position="absolute"
          background="white"
          borderRadius="50%"
          left="50%"
          transform="translateX(-50%)"
          top="-15px"
          boxShadow="0 -3px 20px 0 rgba(45, 45, 45, 0.14)"
          zIndex={-1}
        />
        <RadioButtonGroup
          defaultValue="mids"
          value={defaultValue}
          onChange={handleChange}
          isInline
          width="100%"
          height="100%"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          background="white"
        >
          <CustomRadio value="mids">
            <MdSearch size="25px" />
            MIDs
          </CustomRadio>
          <CustomRadio value="statements">
            <AiFillFile size="25px" />
            Statements
          </CustomRadio>
          <CustomRadio value="quoting" marginLeft="60px">
            <AiFillCalculator size="25px" />
            Quoting
          </CustomRadio>
          <CustomRadio value="profile">
            <FaUserCircle size="25px" />
            Profile
          </CustomRadio>
        </RadioButtonGroup>
        <Button
          borderRadius="50%"
          position="absolute"
          left="50%"
          top="-10px"
          transform="translateX(-50%)"
          width="50px"
          height="50px"
          variant="solid"
          variantColor="green"
          onClick={handleClick}
        >
          <FaPlus size="20px" />
        </Button>
      </Box>
    </AuthenticatedContainer>
  );
};

export default NavBar;
