// All default tasks are declared here!
import fs from 'fs';
import { src, watch } from 'gulp';
import * as Paths from '../gulp/paths';
import * as Pipes from '../gulp/pipes';
import * as Utils from '../gulp/utils';

// Removes 'dist' folder before setup;
export const clear = (callback) => {
  if (fs.existsSync(Paths.Folders.dist))
    fs.rmSync(Paths.Folders.dist, { recursive: true });
  if (typeof callback === 'function') callback();
};

// Check HTML View Files with HTMLHINT
export const htmlhint = (callback) => {
  const source = src([...Paths.Globs.views.html], { base: `./src` });

  return Pipes.Htmlhint(source, callback);
};

// Prettier script build files;
export const prettier = (callback) => {
  const source = src(
    [
      // Add Prettier to all source files (js/ts, scss, modules & html)
      `./src/**/*.{${Paths.Extensions.html}}`,
      `./src/**/*.{${Paths.Extensions.scripts}}`,
      `./src/**/*.{${Paths.Extensions.styles}}`,
    ],
    { base: `./src` },
  );

  return Pipes.Prettier(source, callback);
};

// Bundles script build files;
export const scripts = (callback) => {
  const source = src([...Paths.Globs.src.build.scripts], {
    base: './src',
  });

  return Pipes.Scripts(source, callback);
};

// Eslint javascript files
export const eslint = (callback) => {
  const source = src([...Paths.Globs.src.linters.scripts], { base: './src' });

  return Pipes.Eslint(source, callback);
};

// Stylelint css/scss files
export const stylelint = (callback) => {
  const source = src([...Paths.Globs.src.linters.styles], { base: './src' });

  return Pipes.Stylelint(source, callback);
};

// Scss styles build files;
export const styles = (callback) => {
  const source = src([...Paths.Globs.src.build.styles], { base: './src' });

  return Pipes.Styles(source, callback);
};

// Minifies build images files;
export const assets = (callback) => {
  const source = src([...Paths.Globs.src.build.assets], {
    base: './src',
  });

  return Pipes.Assets(source, callback);
};

// Watch for file changes;
export const watcher = (callback) => {
  // Handles JavaScript file changes;
  const handleJS = (filePath) => {
    const source = src(filePath, { base: './src' });
    return Pipes.Scripts(source, () => Utils.logUpdate(filePath));
  };

  // Handles JavaScript modules changes;
  const handleJSModules = (filePath) => {
    const source = src(
      `${Paths.Folders.src.root}\\**\\*.{${Paths.Extensions.scripts}}`,
      {
        base: './src',
      },
    );
    return Pipes.Scripts(source, () => Utils.logUpdate(filePath));
  };

  // Handles SCSS file changes;
  const handleSCSS = (filePath) => {
    const source = src(filePath, { base: './src' });
    return Pipes.Styles(source, () => Utils.logUpdate(filePath));
  };

  // Handles SCSS modules changes;
  const handleSCSSModules = (filePath) => {
    const parentPath = Utils.getParentPath(filePath);
    const source = src(`${parentPath}\\*.{${Paths.Extensions.styles}}`, {
      base: './src',
    });
    return Pipes.Styles(source, () => Utils.logUpdate(filePath));
  };

  // Declare a watcher for JavaScript files;
  watch([...Paths.Globs.src.build.scripts]).on('change', handleJS);

  // Declare a watcher for SCSS files;
  watch([...Paths.Globs.src.build.styles]).on('change', handleSCSS);

  // Declare a watcher for JavaScript module files;
  watch([...Paths.Globs.src.build.scripts_modules]).on(
    'change',
    handleJSModules,
  );

  // Declare a watcher for SCSS module files;
  watch([...Paths.Globs.src.build.styles_modules]).on(
    'change',
    handleSCSSModules,
  );

  // Declare a watcher for image files;
  watch([...Paths.Globs.src.build.assets], assets);

  // Callback response to 'watch' task;
  callback();

  // Log after watch task is finished;
  console.log(
    `[${`\x1b[2m`}${new Date().toLocaleTimeString()}${`\x1b[0m`}] ${`\x1b[36m`}Watching for changes...${`\x1b[0m`}\n`,
  );
};
