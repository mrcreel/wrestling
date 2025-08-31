export interface Wrestler {
  id: number,
  weightClass?: number,
  abilityScore?: number
}

export interface School {
  id: number,
  numWrestlers?: number
  wrestlers?: Wrestler[]
}