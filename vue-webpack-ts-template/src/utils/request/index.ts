import axios from 'axios'
import { DEFAULT_CONFIG } from './config'
import { setupInterceptors } from './interceptor'

const service = axios.create(DEFAULT_CONFIG)
setupInterceptors(service)

export default service
