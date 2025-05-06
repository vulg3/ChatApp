import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query/react'
import { envApp } from '../config/envConfigs'
import { Mutex } from "async-mutex"
import { RootState } from '../core/hooks/useRedux'
import { authAction } from './reducers/Auth/authSlice'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { auth } from '../config/firebaseConfig'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: envApp.BASEURL,
  credentials: "include",
  timeout: 10000,
  prepareHeaders(headers, api) {
    headers.set("Content-Type", "application/json")
    headers.set("Accept", "application/json")
    headers.set("Authorization", `Bearer ${(api.getState() as RootState).root.auth.access_token}`)
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = retry(
  async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()
        try {
          const refreshResult = (await baseQuery(
            {
              url: "/auth/refresh",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${(api.getState() as RootState).root.auth.refresh_token}`
              },
            },
            api,
            extraOptions,
          )) as any
          if (refreshResult.data) {
            api.dispatch(
              authAction.updateState({
                access_token: refreshResult.data.access_token
              }))
            result = await baseQuery(args, api, extraOptions)
          }
          else {
            await GoogleSignin.signOut()
            await GoogleSignin.revokeAccess()
            await auth.signOut()
          }

        } catch (error) {
          console.log("Refresh token error", error);
        } finally {
          release()
        }
      } else {
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
      }
    }
    return result
  },
  {
    maxRetries: 1,
  }
)

export const apiService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
})
