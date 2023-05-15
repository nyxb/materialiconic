import type { DefaultIcon } from '../defaultIcon'
import type { FileIcon } from './index'

export interface FileIcons {
   /**
   * Define the default icon for folders.
   */
   defaultIcon: DefaultIcon

   /**
   * Defines all folder icons.
   */
   icons: FileIcon[]
}
