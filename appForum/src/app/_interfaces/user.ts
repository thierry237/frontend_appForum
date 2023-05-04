export interface IUser {
    idUser?: number,
    lastname: string,
    firstname: string,
    username: string,
    email: string,
    password: string,
    createdAt?: string,
    isAdmin: boolean
}

export interface ISingleUser {
    dara: IUser
}

export interface IDataUser {
    data: IUser[]
}

export interface IResponseRegister {
    idUser: number,
    username: string,
    isAdmin: boolean
}
