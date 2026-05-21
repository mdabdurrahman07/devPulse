import type { User } from "../modules/auth/auth.interface";

export type PUser = Omit<User, "password">

export const role = ["contributor","maintainer"]

export type Role = (typeof role)[number]

export type IssuesQuery = {
    sort?:string,
    type?:string,
    status?:string
}