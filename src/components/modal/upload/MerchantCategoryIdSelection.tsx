import React, { useContext, useState } from 'react';
import {
  ModalBody,
  Heading,
  RadioButtonGroup,
  Divider,
  ButtonGroup,
  Button,
  Text,
} from '@chakra-ui/core';
import { useQuery } from '@apollo/client';

import { CustomRadio } from 'components/buttons';
import { AppContext, AppActionTypes } from 'services/context/appContext';
import UploadStatementModal from './UploadStatementModal';
import { MERCHANT_CATEGORIES } from 'services/graphql/merchant/queries';
import { MerchantCategory } from 'model/merchant';
import { MerchantCategoryGroupSelection } from '..';
import LoadingSpinner from 'components/loading/LoadingSpinner';

interface Props {
  onClose: () => void;
  groupId: string;
}

const MerchantCategoryIdSelection: React.FC<Props> = ({ groupId }: Props) => {
  const { dispatch } = useContext(AppContext);
  const [categoryId, setCategoryId] = useState<string>('');
  const { error: categoryIdError, loading: categoryIdLoading, data } = useQuery<
    { merchantCategories: MerchantCategory[] },
    { filter: { merchantCategoryGroupId: string } }
  >(MERCHANT_CATEGORIES, {
    variables: {
      filter: {
        merchantCategoryGroupId: groupId,
      },
    },
  });

  const handleNextClick = () => {
    dispatch({
      type: AppActionTypes.SET_MODAL_CONTENT,
      payload: {
        modalTitle: 'Upload New Statement',
        modalContent: (props) => (
          <UploadStatementModal {...props} categoryId={categoryId} groupId={groupId} />
        ),
      },
    });
  };

  const handleBackClick = () => {
    dispatch({
      type: AppActionTypes.SET_MODAL_CONTENT,
      payload: {
        modalTitle: 'Upload New Statement',
        modalContent: MerchantCategoryGroupSelection,
      },
    });
  };

  const handleRadioChange = (value: string | number | undefined) => {
    if (value && typeof value === 'string') {
      setCategoryId(value);
    }
  };

  if (categoryIdError) return <div>Something goes wrong</div>;

  return (
    <ModalBody>
      <Heading as="h2" fontSize="md" color="customGray.300">
        What category id of business (MCC) is this?
      </Heading>
      {categoryIdLoading ? (
        <LoadingSpinner />
      ) : (
        <RadioButtonGroup
          defaultValue={categoryId}
          onChange={handleRadioChange}
          isInline
          width="100%"
          d="flex"
          flexDir="column"
          justifyContent="space-between"
          alignItems="flex-start"
          marginTop="15px"
        >
          {data &&
            data.merchantCategories.map((category) => (
              <CustomRadio
                key={category.id}
                value={category.id}
                fontSize="sm"
                width="100%"
                flexDir="column"
                alignItems="flex-start"
                paddingTop="10px"
              >
                <Text
                  as="p"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  width="100%"
                  textAlign="left"
                  style={{ textOverflow: 'ellipsis' }}
                >
                  {category.name}
                </Text>
                <Divider width="100%" marginBottom="0px" />
              </CustomRadio>
            ))}
        </RadioButtonGroup>
      )}
      <ButtonGroup d="flex" justifyContent="space-between" marginTop="20px">
        <Button
          variant="outline"
          variantColor="gray"
          fontSize="sm"
          borderColor="customGray.600"
          color="customGray.600"
          onClick={handleBackClick}
        >
          Back
        </Button>
        <Button
          variant="solid"
          variantColor="green"
          fontSize="sm"
          onClick={handleNextClick}
          isDisabled={categoryIdLoading || !categoryId}
        >
          Next
        </Button>
      </ButtonGroup>
    </ModalBody>
  );
};

export default MerchantCategoryIdSelection;
