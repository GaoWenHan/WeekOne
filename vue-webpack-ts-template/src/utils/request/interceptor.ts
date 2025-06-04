import type { AxiosInstance,AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import type { ApiResponse } from '@/types/http'

export function setupInterceptors(services:AxiosInstance){
    services.interceptors.request.use(
       (config) => {
            const token = localStorage.getItem('token')
            if(token && config.headers) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
            return config
       },
       (error) => Promise.reject(error)
    )

    services.interceptors.response.use(
        <T>(response: AxiosResponse<ApiResponse<T>>) => {
            const res:any = response.data ?? {}
            
            if(res.code !== 200){
                ElMessage.error(res.message || '请求失败')
                return Promise.reject(res)
            }
            return res
        },
        (error) => {
            const { response } = error
            if(response?.status === 401){
                ElMessage.warning('请重新登录')
                localStorage.removeItem('token')
                router.push('/login')
            }else{
                ElMessage.error(response?.data?.message || '服务器错误')
            }
            return Promise.reject(error)
        }
    )
}