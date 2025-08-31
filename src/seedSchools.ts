import { getNormalRandom } from './functions'
import type {School, Wrestler} from './interfaces'

const numSchools = 8
const schools: School[] = []

for(let sch = 1; sch <= numSchools; sch++){

  const numWrestlers = getNormalRandom(10, 1, 1, 12)
  let wtClasses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const classesToRemove = wtClasses.length - numWrestlers

  for(let c = 0; c < classesToRemove; c++){
    const rem = Math.floor(wtClasses.length * Math.random())
    wtClasses.splice(rem, 1)
  }

  const wrestlers: Wrestler[] = wtClasses.map(w => {
    return {
      id: (sch * 100) + w,
      weightClass: w,
      abilityScore: getNormalRandom(100, 15)
    }
  })

  const school:School = {
    id: sch * 100,
    wrestlers
  }
  schools.push(school)
}

console.log(schools)