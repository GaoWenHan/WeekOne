import { defineStore } from 'pinia'
import type { UserInfo, RouteItem, UserState } from '@/types/user'

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: null,
        userInfo: null,
        permissions: [],
        routes: []
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
        hasPermission: (state) => (perm: string) => state.permissions.includes(perm)
    },
    actions: {
        setUser(data: {
            token: string,
            userInfo: UserInfo,
            permissions: string[],
            routes: RouteItem[]
        }) {
            this.token = data.token
            this.userInfo = data.userInfo
            this.permissions = data.permissions
            this.routes = data.routes
        },
        clearUser() {
            this.token = null
            this.userInfo = null
            this.permissions = []
            this.routes = []
        }
    },
    persist: true  // 启用持久化
})