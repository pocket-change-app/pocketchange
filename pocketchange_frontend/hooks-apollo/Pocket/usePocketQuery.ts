import {useState, useEffect} from 'react'
import * as RA from 'ramda-adjunct'

import { useQuery } from '@apollo/react-hooks'

import PocketQueries from './queries'

export default function usePocketQuery(
    pocketID: String
) {
  const {loading, data, error, refetch} = useQuery(PocketQueries.pocket, {
    variables: { pocketID },
  })

  return {data, loading, refetch, error}
}
