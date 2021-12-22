import { gql } from '@apollo/client';

export const MERCHANT_CATEGORY_GROUP = gql`
  query getMerchantCategoryGroup {
    merchantCategoryGroups {
      id
      name
    }
  }
`;

export const MERCHANT_CATEGORIES = gql`
  query getMerchantCategories($filter: MerchantCategoryFilter) {
    merchantCategories(filter: $filter) {
      code
      id
      name
    }
  }
`;
