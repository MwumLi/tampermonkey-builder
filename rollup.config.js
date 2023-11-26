const { userScriptName } = require('./scripts/constant');
const { readFileSync, writeFileSync, readdirSync } = require('fs');
const { execSync } = require('child_process');
const { join } = require('path');
function ignoreMetadata() {
  return {
    name: 'ignore-metadata', // this name will show up in warnings and errors
    load(id) {
      if (id.endsWith('src/metadata.js')) {
        return ''; // the source code for "virtual-module"
      }
      return null; // other ids should be handled as usually
    }
  };
}

function modifyMetadata(metadata, key, value) {
  const reg = new RegExp(`@${key}\\s+(?<${key}>.+)`)
  return metadata.replace(reg, (str, _value) => {
    return str.replace(_value, value)
  })
}

function generateLocalDevScript() {
  return {
    name: 'generateLocalDevScript',
    writeBundle: {
      sequential: true,
      order: 'post',
      async handler({ dir }) {
        let metadata = execSync(`node scripts/generate-local-dev-script.js`, { cwd: __dirname, encoding: 'utf-8'});
        metadata = modifyMetadata(metadata, 'name', `${userScriptName}（Dev）`);
        const metadataFile = join(__dirname, 'dist/local-dev-userscript.js');
        writeFileSync(metadataFile, metadata, 'utf-8');
      }
    }
  };
}

const plugins = [ignoreMetadata()];
const IsDev = process.env.NODE_ENV !== 'production';
if (IsDev) {
  plugins.push(generateLocalDevScript());
}

function generateEntries() {
  const entriesDir = join(__dirname, 'src/entries');
  const dirs = IsDev ? ['main']: readdirSync(entriesDir);
  return dirs.map(dir => {
    const input = join(entriesDir, dir, 'index.js');
    const name = dir === 'main' ? userScriptName : `${dir} - ${userScriptName}`
    const output = {
      banner: () => {
        let metadata = readFileSync('./src/metadata.js', 'utf-8');
        metadata = modifyMetadata(metadata, 'name', name)
        return metadata;
      },
      file: `dist/${dir}.js`,
      format: 'iife'
    }
    return { input, output, plugins };
  })
}

module.exports = generateEntries()
