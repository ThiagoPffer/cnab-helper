export const WHITES = 'BRANCOS';
export const ZEROS = 'ZEROS'

export type MatchSegmentFunction = (content: string) => boolean;

export interface Template {
    id: number
    description: string
    optional: boolean
    matchSegment: MatchSegmentFunction
    positions: Position[]
}

export enum EnumPositionType {
    N = 'N', // Numeric
    A = 'A', // Alphanumeric
    D = 'D', // Date
    M = 'M'  // Money
}

export interface Position {
    id: number
    init: number
    end: number
    name: string
    description: string,
    type: EnumPositionType
    default?: string
    options?: FieldOption[]
    note?: Note
}

export interface FieldOption {
    id: number
    content: string
    description: string
}

export interface Segment {
    id: string
    description: string
    optional: boolean
    fields: Field[]
}

export interface Field {
    id: number
    content: string
    position: Position
}

export interface FocusedData {
    segment: Segment
    field: Field
    direction?: number
}

export interface NoteIndex {
    [key: number]: Note 
}

export enum NoteContentType {
    TEXT = 'TEXT',
    LIST = 'LIST',
    TABLE = 'TABLE'
}

export interface Note {
    id: number
    description: string
    content: NoteContent[]
}

export interface NoteContent {
    type: NoteContentType
    title?: string
    tableData?: NoteTable[]
    listData?: string[]
    text?: string[]
}

export interface NoteTable {
    columnGroup?: NoteTableColumnGroup[]
    columns: NoteTableColumn[]
    data: NoteTableData[]
    description?: string
    observation?: string
}

export interface NoteTableColumnGroup {
    label: string
    colspan: number
}

export interface NoteTableColumn {
    label: string
    field: string
    width: string
    group?: NoteTableColumn[]
}

export interface NoteTableData {
    [key: string]: string
}

