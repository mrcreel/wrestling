import { readFileSync } from "fs"

import { Wrestler } from "@/api/wrestlers/wrestlers.model"
import { School } from "@/api/schools/schools.model"

const wrestlers: Wrestler[] = JSON.parse(readFileSync("src/data/wrestlers.json", "utf-8"))
const schools: School[] = JSON.parse(readFileSync("src/data/schools.json", "utf-8"))

export {
  wrestlers,
  schools
}
