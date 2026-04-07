export type Slot =
    | { type: 'hour'; hour: number }
    | { type: 'segment'; hours: number[] }
