// This function was created with assistance from Google's Gemini.
/**
 * Generates a random integer based on a normal distribution (bell curve).
 * The result can optionally be clamped to be within a specified min/max range.
 *
 * @param mean The center of the distribution (e.g., 10).
 * @param stDev The standard deviation (how spread out the numbers are, e.g., 1).
 * @param min Optional: The minimum allowed value.
 * @param max Optional: The maximum allowed value.
 * @returns A random integer, biased towards the mean.
 */
export const getNormalRandom = (mean: number, stDev: number, min?: number, max?: number): number => {
  // Box-Muller transform to get a normally distributed random number
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  // Scale to our desired mean and standard deviation
  const rawNumber = z * stDev + mean;

  // Round to the nearest whole number
  const rounded = Math.round(rawNumber);

  // If min and max are defined, clamp the result
  if (min !== undefined && max !== undefined) {
    return Math.max(min, Math.min(rounded, max));
  }

  return rounded;
};

/**
* Creates a random, double round-robin tournament schedule.
*
* @param teams An array of team names or objects.
* @returns A 2D array where each inner array represents a round of matches.
*          Each match is an object with a 'home' and 'away' team.
*/


function oldCreateDblRoundRobinSchedule<T>(teams: T[]): { home: T; away: T }[][] {
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

/**
* Creates a random, double round-robin tournament schedule.
*
* @param teams An array of team names or objects.
* @returns A 2D array where each inner array represents a round of matches.
*          Each match is an object with a 'home' and 'away' team.
*/
export const createDblRoundRobinSchedule = <T>(teams: T[]): { home: T; away: T }[][]  => {
  
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