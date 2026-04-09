export type Slot =
    | { type: 'hour'; hour: number }
    | { type: 'collapsed'; hours: number[]; id: string }
