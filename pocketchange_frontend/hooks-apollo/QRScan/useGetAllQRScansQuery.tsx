import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import QRScanQueries from './queries'
import { ReactNativeBlobUtilFetchPolyfill } from 'react-native-blob-util'

export default function useGetBusinessPocketsQuery(
    userID: String
) {
    const {loading, data, error, refetch} = useQuery(QRScanQueries.getAllQRScans, { 
        variables: { userID: userID }, 

    });

  return {data, loading, refetch, error}
}
