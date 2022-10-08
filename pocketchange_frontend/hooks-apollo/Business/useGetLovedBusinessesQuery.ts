import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import BusinessQueries from './queries'

export default function useGetLovedBusinessesQuery(
    userID: String
) {
  const [businesses, setBusinesses] = useState([])
  const {loading, data, error, refetch} = useQuery(BusinessQueries.getLovedBusinessesByUser, {
    variables: {userID},
    fetchPolicy: 'network-only',
  })
  //console.log("INSIDE APOLLO HOOK")
  //console.log(data)
  //console.log('is not Nil ?', RA.isNotNil(data) )
  useEffect(() => {
    if (RA.isNotNil(data) ) {
      //console.log("got data lol")
      const {getLovedBusinessesByUser} = data
      //console.log(getLovedBusinessesByUser)
      setBusinesses(getLovedBusinessesByUser)
    }
  }, [data])

  return {businesses, loading, refetch}
}
