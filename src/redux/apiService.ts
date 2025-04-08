import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { envApp } from '../config/envConfigs'

const baseQuery = fetchBaseQuery({
  baseUrl: envApp.BASEURL,
  credentials:"include",
  timeout:10000,
})

export const apiService = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: () => ({})
})
