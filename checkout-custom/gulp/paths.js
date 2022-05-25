// All default supported file extensions are declared here!
export const Extensions = Object.freeze({
  html: `html,htm`,
  scripts: `js,ts`,
  styles: `css,scss`,
  assets: `jpeg,jpg,png`,
});

// All default folders are declared here!
export const Folders = Object.freeze({
  dist: `./dist`,
  src: {
    root: `./src`,
    styles: `./src/styles`,
    assets: `./src/assets`,
  },
});

// All default globs are declared here!
export const Globs = Object.freeze({
  src: {
    build: {
      scripts: [
        `${Folders.src.root}/*.{${Extensions.scripts}}`,
        `!./**/*.test.{${Extensions.scripts}}`,
      ],
      styles: [`${Folders.src.styles}/*.{${Extensions.styles}}`],
      assets: [`${Folders.src.assets}/*.{${Extensions.assets}}`],
      scripts_modules: [
        `${Folders.src.root}/**/*.{${Extensions.scripts}}`,
        `!${Folders.src.root}/*.{${Extensions.scripts}}`,
        `!./**/*.test.{${Extensions.scripts}}`,
      ],
      styles_modules: [
        `${Folders.src.styles}/**/*.{${Extensions.styles}}`,
        `!${Folders.src.styles}/*.{${Extensions.styles}}`,
      ],
    },
    linters: {
      scripts: [
        `${Folders.src.root}/*.{${Extensions.scripts}}`,
        `${Folders.src.root}/**/*.{${Extensions.scripts}}`,
        `!./**/*.test.{${Extensions.scripts}}`,
      ],
      styles: [
        `${Folders.src.styles}/*.{${Extensions.styles}}`,
        `${Folders.src.styles}/**/*.{${Extensions.styles}}`,
      ],
    },
  },
  views: {
    html: [
      `./src/views/*.{${Extensions.html}}`,
      `./src/views/**/*.{${Extensions.html}}`,
    ],
  },
});
