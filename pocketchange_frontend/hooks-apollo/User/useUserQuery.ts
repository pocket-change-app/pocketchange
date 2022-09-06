import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import UserQueries from './queries'

export default function useUserQuery(
    userID: String,
) {
  console.log("USE GET USER QUERY USER ID", userID)
  const [user, setUser] = useState([])
  const {loading, data, error, refetch} = useQuery(UserQueries.user, {
    variables: {userID},
    fetchPolicy: 'network-only',
  })
  console.log('user data', data)
  useEffect(() => {
    if (RA.isNotNil(data)) {
      console.log('user data inside', data.user)
      // allBusinesses query is aliased as getAllBusinesses
      const {user} = data
      setUser(user)
    }
  }, [data])

  return {user, loading, refetch}
}
