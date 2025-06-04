import request from '@/utils/request'
import type { LoginParams} from '@/types/login'
import type { LoginData } from '@/types/user'
// import { ApiResponse } from '@/types/http'

export function login(data: LoginParams) {
    return request.post<LoginData>('/auth/login', data)
}