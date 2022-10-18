import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import QRScanQueries from './queries'

export default function useGetBusinessPocketsQuery(
    userID: String
) {
    const {loading, data, error, refetch} = useQuery(QRScanQueries.getAllQRScans, { 
        variables: { userID: userID }, 
        pollInterval: 1000
    });

  return {data, loading, refetch, error}
}
