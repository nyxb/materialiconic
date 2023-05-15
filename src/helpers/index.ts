import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { extensions, workspace } from 'vscode'
import { iconJsonName } from '../icons/index'
import type { IconConfiguration } from '../models/index'

/** Get configuration of vs code. */
export function getConfig(section?: string) {
   return workspace.getConfiguration(section)
}

/** Get list of configuration entries of package.json */
export function getConfigProperties(): { [config: string]: unknown } {
   return extensions.getExtension('nyxb.materialiconic')?.packageJSON
      ?.contributes?.configuration?.properties
}

/** Update configuration of vs code. */
export function setConfig(section: string,
   value: any,
   global = false) {
   return getConfig().update(section, value, global)
}

export function getThemeConfig(section: string) {
   return getConfig('materialiconic').inspect(section)
}

/** Set the config of the theme. */
export function setThemeConfig(section: string,
   value: any,
   global = false) {
   return getConfig('materialiconic').update(section, value, global)
}

/**
 * Checks if the theme is the active icon theme
 * @param{boolean} global false by default
 */
export function isThemeActivated(global = false): boolean {
   return global
      ? getConfig().inspect('workbench.iconTheme')?.globalValue
        === 'materialiconic'
      : getConfig().inspect('workbench.iconTheme')?.workspaceValue
        === 'materialiconic'
}

/** Checks if the theme is not the active icon theme */
export function isThemeNotVisible(): boolean {
   const config = getConfig().inspect('workbench.iconTheme')
   return (
      (!isThemeActivated(true) && !config?.workspaceValue) // no workspace and not global
    || (!isThemeActivated() && !!config?.workspaceValue)
   )
}

/** Return the path of the extension in the file system. */
function getExtensionPath() {
   return extensions.getExtension('nyxb.materialiconic')?.extensionPath ?? ''
}

/** Get the configuration of the icons as JSON Object */
export function getMaterialIconsJSON(): IconConfiguration {
   const iconJSONPath = join(getExtensionPath(), 'dist', iconJsonName)

   try {
      const data = readFileSync(iconJSONPath, 'utf8')
      return JSON.parse(data)
   }
   catch (error) {
      console.error(error)
      return {}
   }
}

/** Capitalize the first letter of a string */
export function capitalizeFirstLetter(name: string): string {
   return name.charAt(0).toUpperCase() + name.slice(1)
}

/** TitleCase all words in a string */
export function toTitleCase(value: string) {
   return value.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase(),
   )
}
