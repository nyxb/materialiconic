import type { QuickPickItem } from 'vscode'
import { window as codeWindow } from 'vscode'
import { getMaterialIconsJSON, setThemeConfig, toTitleCase } from '../helpers'
import { translate } from '../i18n'
import { IconPack } from '../models'

/** Command to toggle the icons packs */
export async function toggleIconPacks() {
   try {
      const activeIconPack = getActiveIconPack()
      const response = await showQuickPickItems(activeIconPack)
      if (response)
         handleQuickPickActions(response)
   }
   catch (error) {
      console.error(error)
   }
}

/** Show QuickPick items to select preferred configuration for the icon packs. */
function showQuickPickItems(activePack: string) {
   const packs = [...getAllIconPacks().sort(), 'none']
   const options = packs.map((pack): QuickPickItem => {
      const packLabel = toTitleCase(pack.replace('_', ' + '))
      const active = isPackActive(activePack, pack)
      const iconPacksDeactivated = pack === 'none' && activePack === ''

      return {
         description: packLabel,
         detail: translate(
        `iconPacks.${pack === 'none' ? 'disabled' : 'description'}`,
        packLabel,
         ),
         label: iconPacksDeactivated ? '\u2714' : active ? '\u2714' : '\u25FB',
      }
   })

   return codeWindow.showQuickPick(options, {
      placeHolder: translate('iconPacks.selectPack'),
      ignoreFocusOut: false,
      matchOnDescription: true,
      matchOnDetail: true,
   })
}

/** Handle the actions from the QuickPick. */
function handleQuickPickActions(value: QuickPickItem) {
   if (!value || !value.description)
      return
   const decision = value.description.replace(' + ', '_').toLowerCase()

   setThemeConfig('activeIconPack', decision === 'none' ? '' : decision, true)
}

function getActiveIconPack(): string {
   return getMaterialIconsJSON()?.options?.activeIconPack ?? ''
}

/** Get all packs that can be used in this icon theme. */
export function getAllIconPacks(): string[] {
   return Object.values(IconPack).map(p => p.toLowerCase())
}

function isPackActive(activePack: string, pack: string) {
   return activePack.toLowerCase() === pack.toLowerCase()
}
