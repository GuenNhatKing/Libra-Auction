import { EmailStatus, AccountStatus } from "./status"

export interface UserInfo {
    id: string,
    hoVaTen: string,
    soDienThoai: string,
    CCCD: string,
    email: string,
    anhDaiDien: string,
    trangThaiEmail: EmailStatus,
    trangThaiTaiKhoan: AccountStatus,
    roles: Role[]
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