import { window as codeWindow } from 'vscode'
import { getConfig } from '../helpers'
import { translate } from '../i18n'

/** Activate the icon theme by changing the settings for the iconTheme. */
export function activateIcons() {
   return setIconTheme()
}

/** Set the icon theme in the config. */
async function setIconTheme() {
   // global user config
   try {
      await getConfig().update(
         'workbench.iconTheme',
         'materialiconic',
         true,
      )

      // local workspace config
      if (getConfig().inspect('workbench.iconTheme')?.workspaceValue)
         getConfig().update('workbench.iconTheme', 'materialiconic')

      codeWindow.showInformationMessage(translate('activated'))
   }
   catch (error) {
      console.error(error)
   }
}
