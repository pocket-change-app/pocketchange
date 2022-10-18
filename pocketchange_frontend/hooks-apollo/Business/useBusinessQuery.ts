import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import BusinessQueries from './queries'

export default function useBusinessQuery(
    businessID: String,
) {
  const {loading, data, error, refetch} = useQuery(BusinessQueries.business, {
    variables: {businessID},
  })

  return {data, loading, error, refetch}
}
