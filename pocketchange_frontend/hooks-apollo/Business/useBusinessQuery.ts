import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import BusinessQueries from './queries'

export default function useBusinessQuery(
    businessID: String,
) {
  console.log("USE GET BUSINESS QUERY BUSINESS ID", businessID)
  const [business, setBusiness] = useState([])
  const {loading, data, error, refetch} = useQuery(BusinessQueries.business, {
    variables: {businessID},
    fetchPolicy: 'network-only',
  })
  //console.log('business data', data)
  useEffect(() => {
    if (RA.isNotNil(data)) {
      //console.log('businesss data inside', data.business)
      // allBusinesses query is aliased as getAllBusinesses
      const {business} = data
      setBusiness(business)
    }
  }, [data])

  return {business, loading, refetch}
}
