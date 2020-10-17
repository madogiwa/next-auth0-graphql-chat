import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  users: Array<Maybe<User>>;
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type GetUserNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserNamesQuery = (
  { __typename?: 'Query' }
  & { users: Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name'>
  )>> }
);


export const GetUserNamesDocument = gql`
    query GetUserNames {
  users {
    name
  }
}
    `;

/**
 * __useGetUserNamesQuery__
 *
 * To run a query within a React component, call `useGetUserNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserNamesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserNamesQuery, GetUserNamesQueryVariables>) {
        return Apollo.useQuery<GetUserNamesQuery, GetUserNamesQueryVariables>(GetUserNamesDocument, baseOptions);
      }
export function useGetUserNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserNamesQuery, GetUserNamesQueryVariables>) {
          return Apollo.useLazyQuery<GetUserNamesQuery, GetUserNamesQueryVariables>(GetUserNamesDocument, baseOptions);
        }
export type GetUserNamesQueryHookResult = ReturnType<typeof useGetUserNamesQuery>;
export type GetUserNamesLazyQueryHookResult = ReturnType<typeof useGetUserNamesLazyQuery>;
export type GetUserNamesQueryResult = Apollo.QueryResult<GetUserNamesQuery, GetUserNamesQueryVariables>;