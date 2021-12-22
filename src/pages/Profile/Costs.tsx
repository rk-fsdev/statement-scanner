import React, { useState, useEffect } from 'react';
import { BoxProps, Text, Button } from '@chakra-ui/core';
import BlockContainer from 'components/grid/BlockContainer';
import BlockHeader from 'components/grid/BlockContainer/BlockHeader';
import BlockBody from 'components/grid/BlockContainer/BlockBody';
import { grayDescTextProps } from 'components/text/textProps';
import DividedInput from 'components/inputs/DividedInput';
import { useMutation, useQuery } from '@apollo/client';
import { Account, AccountExtraSettingsInput } from 'model/auth';
import { ACCOUNT_EXTRA_SETTINGS_UPDATE } from 'services/graphql/auth/mutations';
import { GET_ME } from 'services/graphql/auth/queries';
import LoadingSpinner from 'components/loading/LoadingSpinner';
import { getStyledFee } from 'utils/shared';
import { submitButtonProps } from 'components/buttons/buttonProps';

interface Props extends BoxProps {
  children?: any;
}

interface ProfileFee {
  percentFee: string;
  fixedFee: string;
  [key: string]: string;
}

const Costs: React.FC<Props> = ({ ...restProps }: Props) => {
  const [profileFee, setProfileFee] = useState<ProfileFee>({
    percentFee: '0',
    fixedFee: '0',
  });

  const { loading, data: userData, error, refetch } = useQuery<{ me: Account }, null>(GET_ME, {
    variables: null,
  });
  const [updateAccountExtraSettings] = useMutation<
    { accountExtraSettingsUpdate: Account },
    { input: AccountExtraSettingsInput }
  >(ACCOUNT_EXTRA_SETTINGS_UPDATE);

  useEffect(() => {
    if (userData && userData.me) {
      setProfileFee({
        percentFee: userData.me.percentFee,
        fixedFee: userData.me.fixedFee,
      });
    }
  }, [userData]);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    if (value) {
      let styledFee = getStyledFee(value);
      if (name.toLowerCase().includes('percentfee')) {
        if (styledFee > 100) {
          styledFee = parseFloat(profileFee[name]);
        }
      }
      setProfileFee({
        ...profileFee,
        [name]: styledFee.toFixed(2),
      });
    }
  };

  const handleUpdateFee = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData) {
      const { name } = userData.me;
      try {
        await updateAccountExtraSettings({
          variables: {
            input: {
              name,
              fixedFee: parseFloat(profileFee.fixedFee),
              percentFee: parseFloat(profileFee.percentFee),
            },
          },
        });
        await refetch();
      } catch (e) {
        alert(e.message);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Something goes wrong</div>;
  if (!userData) return <div>Cannot show profile page</div>;

  return (
    <BlockContainer {...restProps}>
      <BlockHeader title="Your processing costs" />
      <BlockBody>
        <form onSubmit={handleUpdateFee}>
          <Text {...grayDescTextProps}>
            Add your custom fees so we can help you forecast profit:
          </Text>
          <DividedInput
            description="% Fee Per Transaction"
            dividedSuffix="-%"
            name="percentFee"
            onChange={handleInputChange}
            value={profileFee.percentFee}
            type="number"
            inputId="cost_percentFee"
            max={100}
            isRequired
          />
          <DividedInput
            description="$ Fee Per Transaction"
            dividedSuffix="$-"
            name="fixedFee"
            onChange={handleInputChange}
            value={profileFee.fixedFee}
            type="number"
            inputId="cost_fixedFee"
            isRequired
          />
          <Button {...submitButtonProps}>Update Profile Fee</Button>
        </form>
      </BlockBody>
    </BlockContainer>
  );
};

export default Costs;
