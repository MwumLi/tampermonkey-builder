const { readFileSync } = require('fs');
const { join } = require('path');
const { userScriptName } = require('./constant');

const originScript = join(__dirname, '../src/metadata.js');
const originScriptContent = readFileSync(originScript, 'utf-8');

const metedataEnd = '// ==/UserScript==';
const result = new RegExp(metedataEnd).exec(originScriptContent);
const originMetedata = originScriptContent.slice(0, result.index-1);

const distUserScript = join(__dirname, '../dist', 'main.js');
const metedata = `
${originMetedata}
// @require file://${distUserScript}
${metedataEnd}
`;
console.log(metedata);