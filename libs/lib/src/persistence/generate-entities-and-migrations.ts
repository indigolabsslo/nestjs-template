import * as fs from 'fs';
import * as path from 'path';

import * as glob from 'glob';

const BASE_PATH = __dirname;
const BASE_ENTITIES_PATH = path.join(BASE_PATH, '..');
const MIGRATIONS_PATH = path.join(BASE_PATH, 'migrations');
const ENTITIES_GLOB = path.join(BASE_PATH, '../**/*.entity{.ts,.js}');
const EXCLUDE_ENTITIES = ['BaseEntity'];
function writeToFile(filename, content) {
  fs.writeFileSync(path.join(BASE_PATH, filename), content);
}

// MIGRATION HANDLING
function createMigrationsContent(files) {
  const imports = files.map((file) => {
    const baseName = path.basename(file, path.extname(file));
    const [timestamp, ...rest] = baseName.split('-');
    const migrationName = rest.join('');
    const className = `${migrationName}${timestamp}`;
    return `import { ${className} } from './migrations/${baseName}';`;
  });

  const migrationsArray = files.map((file) => {
    const baseName = path.basename(file, path.extname(file));
    const [timestamp, ...rest] = baseName.split('-');
    const className = `${rest.join('')}${timestamp}`;
    return className;
  });

  return `
${imports.join('\n')}

export const Migrations: any = [${migrationsArray.join(', ')}];
`;
}

// FIND MIGRATIONS
glob(`${MIGRATIONS_PATH}/*{.ts,.js}`, (err, files) => {
  if (err) throw err;
  const content = createMigrationsContent(files);
  writeToFile('migrations.ts', content);
});

// ENTITY HANDLING
function convertFileNameToClassName(fileName) {
  return fileName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
    .replace('.entity', '');
}

function generateImportStatements(files) {
  console.log(files);

  return files
    .map((file) => {
      const fileName = path.basename(file, path.extname(file));
      const className = convertFileNameToClassName(fileName);
      const directory = path.dirname(path.relative(BASE_ENTITIES_PATH, file));
      return `import { ${className} } from '@lib/${directory}/${fileName}';`;
    })
    .join('\n');
}

function generateEntitiesArray(files) {
  return files.map((file) => {
    const fileName = path.basename(file, path.extname(file));
    const className = convertFileNameToClassName(fileName);
    return className;
  });
}
// FIND ENTITIES
glob(ENTITIES_GLOB, (err, files) => {
  if (err) {
    console.error('Error finding entity files:', err);
    return;
  }
  const filteredFiles = files.filter((file) => {
    const fileName = path.basename(file, path.extname(file));
    const className = convertFileNameToClassName(fileName);
    return !EXCLUDE_ENTITIES.includes(className);
  });

  const importStatements = generateImportStatements(filteredFiles);
  const entitiesArray = generateEntitiesArray(filteredFiles);
  const content = `${importStatements}\n\nexport const Entities = [\n  ${entitiesArray.join(
    ',\n  ',
  )},\n];\n`;

  const outputPath = path.join(BASE_PATH, 'entities.ts');
  fs.writeFileSync(outputPath, content);
  console.log(`Entities index file written to ${outputPath}`);
});
