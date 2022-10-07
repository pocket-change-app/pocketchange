import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import TransactionQueries from './queries'

export default function useGetAllTransactionsQuery(
    pocketID?: String,
    businessID?: String,
    consumerID?: String,
    merchantID?: String,
    startDate?: String,
    endDate?: String,
) {
  const [allTransactions, setAllTransactions] = useState([])
  const {loading, data, error, refetch} = useQuery(TransactionQueries.getAllTransactions, {
    variables: {pocketID, businessID, consumerID, merchantID, startDate, endDate},
    fetchPolicy: 'network-only',
  })

  //console.log(JSON.stringify(error, null, 2))
  useEffect(() => {
    if (RA.isNotNil(data)) {
      console.log("transaction hook", data)
      const {getAllTransactions} = data
      setAllTransactions(getAllTransactions)
    }
  }, [data])

  return {allTransactions, loading, refetch, error}
}
