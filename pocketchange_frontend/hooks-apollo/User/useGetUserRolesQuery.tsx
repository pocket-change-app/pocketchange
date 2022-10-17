import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import UserQueries from './queries'

export default function useGetUserRolesQuery(
    userID: String
) {
  const {loading, data, error, refetch} = useQuery(UserQueries.getUserRoles, {
    variables: { userID },
  })

  return {data, loading, refetch, error}
}
