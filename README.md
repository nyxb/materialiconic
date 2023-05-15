[![cover][cover-src]][cover-href]
[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]

> 🌠🥳 A set of icons inspired by Material Design for Visual Studio Code

### 📄 Icons for files

![fileIcons-src]

### 📁 Icons for folders

![folderIcons-src]

#### 🎨 Personalize file & folder colors

You can modify the color of the default file and folder icons using the command palette:

![set-folder-color-src]

or through user preferences:

```json
"materialiconic.folders.color": "#ef5350",
"materialiconic.files.color": "#42a5f5",
```

#### 📁 Change folder designs

You can alter the appearance of the folder icons using the command palette:

![set-folder-theme-src]

or through user preferences:

```json
"materialiconic.folders.theme": "specific"
```

## 💧 Set your own icon opacity

You can establish a custom opacity for the icons:

```json
"materialiconic.opacity": 0.5
```

## 🌈 Adjust icon saturation

If colors don't bring you joy, you can make the icons less saturated, giving them a grayish look or turning them completely grayscale by setting saturation to 0:

```json
"materialiconic.saturation": 0.5
```

You can also achieve no saturation (i.e., grayscale) by enabling **Toggle Grayscale**.

## 🔄 Tailor icon associations

You can personalize the icon associations directly in the user preferences.

### 📎 Associations for files

With the `*.[extension]` pattern, you can set custom file icon associations. For instance, you could assign an icon for `*.sample`, and any file ending with `.sample` will display the specified icon. However, files with the same extension won't always share the same icon. Some specific file names have unique icons. To overwrite all the specific file icons as well, use two asterisks instead of one, like `**.[extension]`.

If there's no leading `*`, it will be automatically configured as a filename rather than a file extension.

```json
"materialiconic.files.associations": {
    "*.ts": "typescript",
    "**.json": "json",
    "fileName.ts": "angular"
}
```

#### 🎨 Add your own SVG icons

You can incorporate custom icons by adding a path to an SVG file located relative to the extension's dist folder. However, the custom icons' directory must be within the `extensions` directory of the `.vscode` folder in the user directory.

For example, a custom SVG file called `sample.svg` can be placed in an `icons` folder inside of VS Code's `extensions` folder:

```
.vscode
 ┗ extensions
   ┗ icons
     ┗ sample.svg
```

In the settings.json, the icon can be associated with a file name or file extension like this:

```json
"materialiconic.files.associations": {
    "fileName.ts": "../../icons/sample"
}
```

**Note**: The custom file name must be configured in the settings without the file ending `.svg`, as shown in the example above._

### 🗂️ Associations for folders

The following configuration can customize the folder icons. It is also possible to overwrite existing associations and create attractive combinations. For example, you could change the folder theme to "classic" and define icons only for the folder names you prefer.

```json
"materialiconic.folders.associations": {
    "customFolderName": "src",
    "sample": "dist"
}
```

#### 🖼️ Custom SVG folder icons

Similar to files, you can reference your own SVG icons for folder icons. It's important to provide two SVG files: one for the closed folder state and another for the opened state. These two files - let's call them "folder-sample.svg" and "folder-sample-open.svg" - must be placed into a directory relative to the extension's dist folder. This directory has to be within the `.vscode/extensions` folder.

In our example, we place them into an `icons` folder inside of the `.vscode/extensions` folder:

```
.vscode
 ┗ extensions
   ┗ icons
     ┣ folder-sample.svg
     ┗ folder-sample-open.svg
```

In the settings.json, the folder icons can be associated with a folder name (e.g. "src") like this:

```json
"materialiconic.folders.associations": {
    "src": "../../../../icons/folder-sample"
}
```

### 🌐 Associations for languages

With the following configuration, you can customize the language icons. It is also possible to overwrite existing associations.

```json
"materialiconic.languages.associations": {
    "languageId": "iconName",
    "json": "json"
}
```

You can view the available icon names in the overview above. See "[Known language identifiers](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers)" in the VS Code documentation for a list of allowed values for `languageId`.

## ⌨️ Commands

Press `Ctrl-Shift-P` to open the command palette and type `materialiconic`.

![commandPalette-src]

<p></p>

| Command                           | Description                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| **Enable Icon Theme**             | Activate the icon theme.                                                            |
| **Modify File Color**             | Change the color of the file icons.                                                 |
| **Modify Folder Color**           | Change the color of the folder icons.                                               |
| **Alter Folder Design**           | Change the design of the folder icons.                                              |
| **Adjust Opacity**                | Change the opacity of the icons.                                                    |
| **Tweak Saturation**              | Change the saturation value of the icons.                                           |
| **Configure Icon Packs**          | Select an icon pack that adds extra icons (e.g. for Angular, React, Ngrx).          |
| **Toggle Explorer Arrows**        | Show or hide the arrows next to the folder icons.                                   |
| **Restore Default Settings**      | Reset to the default configuration.                                                 |
| **Toggle Grayscale**              | Set icon saturation to `0` (grayscale), or `1` (color).                             |

## 🌐 Sources of icons

- [Material Design Icons](https://materialdesignicons.com/)

**Interested in contributing?**

Check out the [contribution guidelines](https://github.com/nyxb/materialiconic/blob/main/CONTRIBUTING.md) and open a [new issue](https://github.com/nyxb/materialiconic/issues) or [pull request](https://github.com/nyxb/materialiconic/pulls) on GitHub.

## 🧩 Related extensions

- [MaterialIconic for GitHub](https://github.com/nyxb/github-materialiconic-extension)

[npm-version-src]: https://img.shields.io/npm/v/materialiconic?style=flat&colorA=18181B&colorB=14F195
[npm-version-href]: https://npmjs.com/package/materialiconic

[license-src]: https://img.shields.io/github/license/nyxb/materialiconic.svg?style=flat&colorA=18181B&colorB=14F195
[license-href]: https://github.com/nyxb/materialiconic/blob/main/LICENSE

<!-- Cover -->
[cover-src]: https://raw.githubusercontent.com/nyxb/materialiconic/main/.github/assets/cover-github-materialiconic.png
[cover-href]: https://💻nyxb.ws

<!-- Images -->
[commandPalette-src]: https://raw.githubusercontent.com/nyxblabs/materialiconic/main/images/commandPalette.png
[fileIcons-src]: https://raw.githubusercontent.com/nyxblabs/materialiconic/main/images/fileIcons.png
[folderIcons-src]: https://raw.githubusercontent.com/nyxblabs/materialiconic/main/images/folderIcons.png
[set-folder-color-src]: https://raw.githubusercontent.com/nyxblabs/materialiconic/main/images/set-folder-color.gif
[set-folder-theme-src]: https://raw.githubusercontent.com/nyxblabs/materialiconic/main/images/set-folder-theme.gif
