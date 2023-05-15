import { dirname, join } from 'node:path'
import type { IconJsonOptions } from '../models'

export function getCustomIconPaths(options: IconJsonOptions) {
   return Object.values(options?.files?.associations ?? {})
      .filter(v => v.match(/^[.\/]+/)) // <- custom dirs have a relative path to the dist folder
      .map(v => dirname(join(__dirname, v)))
}
