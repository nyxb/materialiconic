import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import consolji from 'consolji'
import { green, red } from '../helpers/painter'
import { createScreenshot } from '../helpers/screenshots'
import { toTitleCase } from './../helpers/titleCase'

const htmlDoctype = '<!DOCTYPE html>'
const cssFilePath = 'style.css'
const styling = `<link rel="stylesheet" href="${cssFilePath}">`

function createHTMLTableHeadRow(amount: number) {
   const pair = `
        <th class="icon">Icon</th>
        <th class="iconName">Name</th>
    `
   const columns = [...Array(amount)].map(() => pair).join('')
   return `
        <tr>
            ${columns}
        </tr>
    `
}

function createHTMLTableBodyRows(items: IconDefinition[][]) {
   let rows = ''
   items.forEach((row) => {
      const columns = row
         .map(
            icon => `
            <td class="icon">
                <img src="./../../../icons/${icon.iconName}.svg" alt="${
          icon.label
        }">
            </td>
            <td class="iconName">${toTitleCase(icon.label)}</td>
        `,
         )
         .join('')
      const tableRow = `
            <tr>
                ${columns}
            </tr>
        `
      rows = rows + tableRow
   })
   return rows
}

function createHTMLTable(headRow: string, bodyRows: string) {
   return `
    <table>
        ${headRow}
        ${bodyRows}
    </table>
`
}

function createPreviewTable(icons: IconDefinition[][], size: number) {
   const table
    = htmlDoctype
    + styling
    + createHTMLTable(
       createHTMLTableHeadRow(size),
       createHTMLTableBodyRows(icons),
    )
   return table
}

function savePreview(fileName: string,
   size: number,
   icons: IconDefinition[][]) {
   const filePath = join(__dirname, `${fileName}.html`)

   // write the html file with the icon table
   writeFileSync(filePath, createPreviewTable(icons, size))

   // create the image
   createScreenshot(filePath, fileName)
      .then(() => {
         consolji.log(
            'MaterialIconic:',
            green(`Successfully created ${fileName} preview image!`),
         )
      })
      .catch(() => {
         throw new Error(red(`Error while creating ${fileName} preview image`))
      })
}

function getIconDefinitionsMatrix(icons: IconDefinition[],
   size: number,
   excluded: string[] = []): IconDefinition[][] {
   const iconList = icons.sort((a, b) => a.label.localeCompare(b.label))
   trimIconListToSize(iconList, size, excluded)

   // list for the columns with the icons
   const matrix: IconDefinition[][] = []

   // calculate the amount of icons per column
   const itemsPerColumn = Math.floor(iconList.length / size)

   // create the columns with the icons
   let counter = 0
   for (let c = 0; c < itemsPerColumn; c++)
      matrix[c] = []

   for (let s = 0; s < size; s++) {
      for (let i = 0; i < itemsPerColumn; i++) {
         matrix[i][s] = iconList[counter]
         counter++
      }
   }

   return matrix
}

/**
 * Function that generates the preview image for specific icons.
 * @param name name of the preview
 * @param icons icons for the preview
 * @param size amount of table columns
 * @param trimmableIcons List of icons that can possibly be trimmed
 */
export function generatePreview(name: string,
   icons: IconDefinition[],
   size: number,
   trimmableIcons: string[] = []) {
   savePreview(
      name,
      size,
      getIconDefinitionsMatrix(icons, size, trimmableIcons),
   )
}

interface IconDefinition {
   iconName: string
   label: string
}

/**
 * Trim the list of icons into the matrix
 * @param iconList List of icons
 * @param size Amount of columns
 * @param trimmableIcons List of icons that can possibly be trimmed
 */
function trimIconListToSize(iconList: IconDefinition[],
   size: number,
   trimmableIcons: string[]) {
   while (iconList.length % size !== 0) {
      iconList.splice(
         iconList.findIndex(
            i => i.iconName === trimmableIcons[iconList.length % size],
         ),
         1,
      )
   }
}
