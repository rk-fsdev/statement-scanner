import { CustomFeeType, CustomFeeApplicability, CustomFeeInput } from 'model/auth';

export const initialCustomFeeInput: CustomFeeInput = {
  name: '',
  amount: '',
  type: CustomFeeType.FIXED,
  applicability: CustomFeeApplicability.MONTHLY,
};
