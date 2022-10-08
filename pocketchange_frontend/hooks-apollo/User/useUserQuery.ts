import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import UserQueries from './queries'

export default function useUserQuery(
    userID: String,
) {
  const [user, setUser] = useState([])
  const {loading, data, error, refetch} = useQuery(UserQueries.user, {
    variables: {userID},
    fetchPolicy: 'network-only',
  })
  useEffect(() => {
    if (RA.isNotNil(data)) {
      //console.log('user data inside', data.user)
      // allBusinesses query is aliased as getAllBusinesses
      const {user} = data
      setUser(user)
    }
  }, [data])

  return {user, loading, refetch}
}
