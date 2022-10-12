import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import PocketQueries from './queries'

export default function usePocketQuery(
    pocketID: String
) {
  const [pocket, setPocket] = useState([])
  const {loading, data, error, refetch} = useQuery(PocketQueries.pocket, {
    variables: {pocketID},
    fetchPolicy: 'network-only',
  })
  console.log('pocket data', data)
  useEffect(() => {
    if (RA.isNotNil(data)) {
      // allBusinesses query is aliased as getAllBusinesses
      const {pocket} = data
      setPocket(pocket)
    }
  }, [data])

  return {pocket, loading, refetch, error}
}
