export interface UserInfo {
    id: number
    username: string
    name: string
    roles: string[]
}

export interface RouteItem {
    path: string
    component: string
    name: string
    icon: string | null
    showInMenu: boolean
}

export interface UserState {
    token: string | null
    userInfo: UserInfo | null
    permissions: string[]
    routes: RouteItem[]
}

export interface LoginData {
    token: string
    userInfo: UserInfo
    permissions: string[]
    routes: RouteItem[]
}

