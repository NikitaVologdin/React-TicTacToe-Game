export interface ITileData {
  mark: "x" | "o" | undefined
  location: string
  index: number
  disabled: boolean
}

export type IMap = ITileData[]
