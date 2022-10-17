import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import PocketQueries from './queries'
import { ReactNativeBlobUtilFetchPolyfill } from 'react-native-blob-util'

export default function useGetBusinessPocketsQuery(
    businessID: String
) {
  const {loading, data, error, refetch} = useQuery(PocketQueries.getBusinessPockets, {
    variables: { businessID: businessID },
  })
  
  return {data, loading, refetch, error}
}
