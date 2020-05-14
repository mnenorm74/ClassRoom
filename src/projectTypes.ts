export interface IStorageContentIcon {
    type: string,
    name: string,
    owner: string,
    date: string,
    semester?:string,
    content?: any[]
}

export interface IStorageContentIconPaged extends IStorageContentIcon{
    pageElements:IStorageContentIcon[]
}

export interface IComment {
    AuthorId: string,
    Content: string,
    Date: string
}