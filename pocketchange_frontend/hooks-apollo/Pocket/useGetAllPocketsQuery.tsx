import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import PocketQueries from './queries'

export default function useGetAllPocketsQuery(
    userID: String
) {
  const {loading, data, error, refetch} = useQuery(PocketQueries.getAllPockets, {
    variables: { userID },
  })

  return {data, loading, error, refetch}
}
