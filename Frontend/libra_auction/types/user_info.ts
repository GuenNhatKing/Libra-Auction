import { EmailStatus, AccountStatus } from "./status"

export interface UserInfo {
    id: string,
    fullName: string,
    phoneNumber: string,
    identityNumber: string,
    email: string,
    avatarUrl: string,
    emailStatus: EmailStatus,
    accountStatus: AccountStatus,
    role: Role,
    hasPasswordAccount: boolean
}

export interface Role {
    name: string,
    description: string,
    permissions: Permission[]
}

export interface Permission {
    name: string,
    description: string,
}
