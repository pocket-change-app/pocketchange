import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import BusinessQueries from './queries'

export default function useGetAllBusinessesQuery(
    pocketID?: String,
    businessID?: String,
    businessType?: String,
    businessSubtype?: String,
    businessTag?: String,
) {
  const {loading, data, error, refetch} = useQuery(BusinessQueries.getAllBusinesses, {
    variables: {pocketID, businessID, businessType, businessSubtype, businessTag},
  })
  return {data, loading, error, refetch}
}
