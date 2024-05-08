import { Template } from "./segment"

export interface Bank {
    code: number
    name: string
    imgName: string
    selected?: boolean
    cnabs: Cnab[]
}

export interface Cnab {
    id: number
    name: string
    fileOptions: FileOption[]
}

export interface FileOption {
    id: number
    name: string
}

export interface Options {
    bank?: Bank
    cnab?: Cnab
    fileTypeId?: number
    content?: string
}
