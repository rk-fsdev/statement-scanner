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
import { MERCHANT_CATEGORY_GROUP } from 'services/graphql/merchant/queries';
import { MerchantCategoryGroup } from 'model/merchant';
import MerchantCategoryIdSelection from './MerchantCategoryIdSelection';
import LoadingSpinner from 'components/loading/LoadingSpinner';

interface Props {
  onClose: () => void;
}

const BusinessTypeSelection: React.FC<Props> = ({ onClose }: Props) => {
  const { dispatch } = useContext(AppContext);
  const [groupId, setGroupId] = useState<string>('');

  const { error: categoryGroupError, data, loading: categoryGroupLoading } = useQuery<
    { merchantCategoryGroups: MerchantCategoryGroup[] },
    null
  >(MERCHANT_CATEGORY_GROUP, {
    variables: null,
  });

  const handleNextClick = () => {
    dispatch({
      type: AppActionTypes.SET_MODAL_CONTENT,
      payload: {
        modalTitle: 'Upload New Statement',
        modalContent: (props) => <MerchantCategoryIdSelection {...props} groupId={groupId} />,
      },
    });
  };

  const handleRadioChange = (value: string | number | undefined) => {
    if (value && typeof value === 'string') {
      setGroupId(value);
    }
  };

  if (categoryGroupError) return <div>Something goes wrong</div>;

  return (
    <ModalBody>
      <Heading as="h2" fontSize="md" color="customGray.300">
        What category group of business (MCC) is this?
      </Heading>
      {categoryGroupLoading ? (
        <LoadingSpinner />
      ) : (
        <RadioButtonGroup
          defaultValue={groupId}
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
            data.merchantCategoryGroups.map((categoryGroup) => (
              <CustomRadio
                key={categoryGroup.id}
                value={categoryGroup.id}
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
                  {categoryGroup.name}
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
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          variantColor="green"
          fontSize="sm"
          onClick={handleNextClick}
          isDisabled={categoryGroupLoading || !groupId}
        >
          Next
        </Button>
      </ButtonGroup>
    </ModalBody>
  );
};

export default BusinessTypeSelection;
