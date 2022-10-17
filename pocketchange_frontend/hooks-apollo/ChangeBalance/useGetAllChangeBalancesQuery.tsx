import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'
import { useQuery } from '@apollo/react-hooks'
import ChangeBalanceQueries from './queries'

export default function useGetAllChangeBalances(
    userID?: String | undefined,
    pocketID?: String | undefined
) {
    const {loading, data, error, refetch} = useQuery(ChangeBalanceQueries.getAllChangeBalances, {
        variables: { userID: userID, pocketID: pocketID },
    })

    return {data, loading, refetch, error}
}
