export type UserRole = "customer" | "supplier" | "admin" | "support"

export type UserStatus = "active" | "pending" | "suspended"

export interface UserContact {
  phone?: string
  address?: string
  city?: string
  country?: string
}

export interface UserPreferences {
  [key: string]: string | boolean | number 
}

export interface IUser {
  _id: string
  name: string
  email: string
  passwordHash: string
  role: UserRole
  contact?: UserContact
  status: UserStatus
  preferences?: UserPreferences
  createdAt: string
  updatedAt: string
}



export interface IUserCreateDto {
  name: string
  email: string
  passwordHash: string
  role: UserRole
  contact?: UserContact
  status: UserStatus
  preferences?: UserPreferences
  createdAt: string
  updatedAt: string
}

export type IUserUpdateDto = Partial<IUserCreateDto>
