import type { User } from "../modules/auth/auth.interface";

export type PUser = Omit<User, "password">