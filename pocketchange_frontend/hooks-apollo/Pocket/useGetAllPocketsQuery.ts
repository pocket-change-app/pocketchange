import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import PocketQueries from './queries'

export default function useGetAllPocketsQuery(
    userID: String
) {
  const [allPockets, setAllPockets] = useState([])
  const {loading, data, error, refetch} = useQuery(PocketQueries.getAllPockets, {
    variables: {userID},
    fetchPolicy: 'network-only',
  })
  console.log('pocket data', data)
  useEffect(() => {
    if (RA.isNotNil(data)) {
      // allBusinesses query is aliased as getAllBusinesses
      const {getAllPockets} = data
      setAllPockets(getAllPockets)
    }
  }, [data])

  return {allPockets, loading, refetch}
}
