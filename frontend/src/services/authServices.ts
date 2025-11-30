import type { ICreateUserPayload, ILoginPayload } from '@/types/types'

export const createUserService = (payload: ICreateUserPayload) => {
  console.log('create user payload: ', payload)
}

export const loginUserService = (payload: ILoginPayload) => {
  console.log('Login user payload: ', payload)
}
