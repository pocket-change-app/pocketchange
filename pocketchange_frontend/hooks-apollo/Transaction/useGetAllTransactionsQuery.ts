import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import TransactionQueries from './queries'

export default function useGetAllTransactionsQuery(
    pocketID?: String,
    businessID?: String,
    userID?: String,
    startDate?: String,
    endDate?: String,
) {
  const [allTransactions, setAllTransactions] = useState([])
  const {loading, data, error, refetch} = useQuery(TransactionQueries.getAllTransactions, {
    variables: {pocketID, businessID, userID, startDate, endDate},
    fetchPolicy: 'network-only',
  })
  useEffect(() => {
    if (RA.isNotNil(data)) {
      // allBusinesses query is aliased as getAllBusinesses
      const {getAllTransactions} = data
      setAllTransactions(getAllTransactions)
    }
  }, [data])

  return {allTransactions, loading, refetch}
}
