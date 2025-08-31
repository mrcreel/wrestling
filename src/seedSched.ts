/**
* Creates a random, double round-robin tournament schedule.
*
* @param teams An array of team names or objects.
* @returns A 2D array where each inner array represents a round of matches.
*          Each match is an object with a 'home' and 'away' team.
*/


function createDblRoundRobinSchedule<T>(teams: T[]) {//: { home: T; away: T }[][] {
  // 1. Add randomness by shuffling the teams before scheduling
  const shuffled = [...teams].sort(() => Math.random() - 0.5)

  // 2. Handle an odd number of teams by adding a "BYE"
  let schedTeams: (T | null)[] = [...shuffled]
  if (schedTeams.length % 2 !== 0) {
    schedTeams.push(null); // Using null to represent the BYE
  }
  const numTeams = schedTeams.length
  const numRounds = numTeams - 1
  const halfSeasonRounds = numRounds
  const scheduleA: {home: T, away: T}[][] = []

  for(let round = 0; round < halfSeasonRounds; round++){
    const currRound: {home: T, away: T}[] = []

    for(let i = 0; i < numTeams / 2; i++){
      const homeTm = schedTeams[i]
      const awayTm = schedTeams[numTeams - 1 - i]
      // Skip matches against the "BYE" 
      if(homeTm !== null && awayTm !== null){
        // Alternate home/away for the fixed team (team at index 0)
        if(round % 2 === 0) {
          currRound.push({home: awayTm, away: homeTm})
        } else {
          currRound.push({home: homeTm, away: awayTm})
        }
      }
    }
    scheduleA.push(currRound)
    // 3. Rotate the teams for the next round (keeping the first team fixed)
    const fixedTeam = schedTeams.shift()! // Take out first team
    const lastTeam = schedTeams.pop()! // Take out last team
    schedTeams.unshift(lastTeam) // Put last team second because...
    schedTeams.unshift(fixedTeam) // Fixed team goes back to the front
  }
  // 4. Create the second half of the season by reversing the home/away teams
  const scheduleB: { home: T; away: T }[][] = []
  for (const round of scheduleA){
    const retRd: {home: T, away: T}[] = []
    for (const match of round){
      retRd.push({home: match.away, away: match.home})
    }
    scheduleB.push(retRd)
  }

  return [...scheduleA, ...scheduleB].sort(() => Math.random() - 0.5)

}

const sched = createDblRoundRobinSchedule([100, 200, 300, 400, 500, 600, 700, 800])
console.log(sched)