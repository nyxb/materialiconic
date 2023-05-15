import { readdir } from 'node:fs'
import { join, parse } from 'node:path'
import consolji from 'consolji'
import type { DefaultIcon, FolderIcon, FolderTheme } from '../../../models/index'
import { green, red } from '../../helpers/painter'
import {
   fileIcons,
   folderIcons,
   highContrastColorFileEnding,
   languageIcons,
   lightColorFileEnding,
   openedFolder,
} from './../../../icons'

/**
 * Defines the folder where all icon files are located.
 */
const folderPath = join('icons')

/**
 * Defines an array with all icons that can be found in the file system.
 */
const availableIcons: { [s: string]: string } = {}

/**
 * Get all icon file names from the file system.
 */
function fsReadAllIconFiles(error: NodeJS.ErrnoException | null,
   files: string[]) {
   if (error)
      throw new Error(error.message)

   files.forEach((file) => {
      const fileName = file
      const iconName = parse(file).name
      availableIcons[iconName] = fileName
   })

   checkUsageOfAllIcons()
   handleErrors()
}

function checkUsageOfAllIcons() {
   const usedFileIcons: string[] = getAllUsedFileIcons()
   const usedFolderIcons: string[] = getAllUsedFolderIcons()
   const usedLanguageIcons: string[] = getAllUsedLanguageIcons();

   [...usedFileIcons, ...usedFolderIcons, ...usedLanguageIcons].forEach(
      (icon) => {
         delete availableIcons[icon]
      },
   )
}

function handleErrors() {
   const amountOfUnusedIcons = Object.keys(availableIcons).length
   if (amountOfUnusedIcons === 0) {
      consolji.log('MaterialIconic:', green('Passed icon usage checks!'))
   }
   else {
      consolji.log(
         `MaterialIconic: ${red(`${amountOfUnusedIcons} unused icon(s):`)}`,
      )
      Object.keys(availableIcons).forEach((icon) => {
         consolji.log(red(`- ${availableIcons[icon]}`))
      })
      throw new Error('Found unused icon files!')
   }
}

// read from the file system
export const check = () => readdir(folderPath, fsReadAllIconFiles)

function getAllUsedFileIcons(): string[] {
   return [
      fileIcons.defaultIcon.name,
      fileIcons.defaultIcon.light
         ? fileIcons.defaultIcon.name + lightColorFileEnding
         : '',
      fileIcons.defaultIcon.highContrast
         ? fileIcons.defaultIcon.name + highContrastColorFileEnding
         : '',
      ...fileIcons.icons.map(icon => icon.name),
      ...fileIcons.icons
         .filter(icon => icon.light)
         .map(icon => icon.name + lightColorFileEnding),
      ...fileIcons.icons
         .filter(icon => icon.highContrast)
         .map(icon => icon.name + highContrastColorFileEnding),
   ].filter(f => f !== '')
}

function getAllUsedFolderIcons(): string[] {
   const icons = folderIcons
      .map(theme => (theme.name === 'none' ? [] : getAllFolderIcons(theme)))
      .reduce((a, b) => a.concat(b))
   return icons
      .map((icon) => {
         return [
            icon.name,
            icon.name + openedFolder,
            icon.light ? icon.name + lightColorFileEnding : '',
            icon.light ? icon.name + openedFolder + lightColorFileEnding : '',
            icon.highContrast ? icon.name + highContrastColorFileEnding : '',
            icon.highContrast
               ? icon.name + openedFolder + highContrastColorFileEnding
               : '',
         ]
      })
      .filter(icon => icon !== undefined)
      .reduce((a, b) => a.concat(b))
}

function getAllFolderIcons(theme: FolderTheme): (FolderIcon | DefaultIcon)[] {
   const icons = theme.icons || []
   const allFolderIcons = [theme.defaultIcon, ...icons]
   if (theme.rootFolder)
      allFolderIcons.push(theme.rootFolder)

   return allFolderIcons
}

function getAllUsedLanguageIcons(): string[] {
   const icons = [
      ...languageIcons.map(lang => lang.icon.name),
      ...languageIcons
         .filter(lang => lang.icon.light)
         .map(lang => lang.icon.name + lightColorFileEnding),
      ...languageIcons
         .filter(lang => lang.icon.highContrast)
         .map(lang => lang.icon.name + highContrastColorFileEnding),
   ]
   return icons
}
