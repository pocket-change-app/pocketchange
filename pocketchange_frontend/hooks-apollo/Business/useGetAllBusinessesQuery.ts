import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import BusinessQueries from 'backend/graphql/schema/Business/queries'

export default function useGetAllBusinessesQuery(
    pocketID?: String,
    businessID?: String,
    businessType?: String,
    businessSubtype?: String,
    businessTag?: String,
) {
  const [allBusinesses, setAllBusinesses] = useState([])
  const {loading, data, error, refetch} = useQuery(BusinessQueries.getAllBusinesses, {
    variables: {pocketID, businessID, businessType, businessSubtype, businessTag},
    fetchPolicy: 'network-only',
  })
  useEffect(() => {
    if (RA.isNotNil(data)) {
      // allBusinesses query is aliased as getAllBusinesses
      const {getAllBusinesses} = data
      setAllBusinesses(getAllBusinesses)
    }
  }, [data])

  return {allBusinesses, loading, refetch}
}
