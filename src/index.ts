import "regenerator-runtime/runtime"
import * as fs from 'fs'
import { LIB_31 } from './config'
import { getColours, getTypography, getElevation, getGrid, getSpacing } from './parsers'
import { getFileStyles } from "@design-automata/node-figma"

const getTokens = async () => {
  // get all styles
  const fileStyles = await getFileStyles(LIB_31).then((data: any) => data.meta.styles);

  let tokens = {
    colours: await getColours(),
    typography: await getTypography(fileStyles),
    elevation: await getElevation(fileStyles),
    grid: await getGrid(fileStyles),
    spacing: await getSpacing()
  }

  let renamedTokens = rename(tokens);

  // individual files
  for (const key in renamedTokens) {
    fs.writeFile(`${process.cwd()}/tokens/${key}.json`, JSON.stringify(tokens[key], null, '\t'), err => {
      if (err) throw err;
    });
  }

  // all
  fs.writeFile(`${process.cwd()}/tokens/all.json`, JSON.stringify(renamedTokens, null, '\t'), err => {
    if (err) throw err;
  });
}

if (!fs.existsSync(`${process.cwd()}/tokens`)){
  fs.mkdirSync(`${process.cwd()}/tokens`);
}

function rename(ref) {
  const renamed = {};
  for (const key in ref) {
    let node = ref[key];
    let newKey = key.replace(/[-\s]/g, "_").toLowerCase();
    if (typeof node === 'object') {
      node = rename(node);
    }

    renamed[newKey] = node;
  }
  return renamed;
}

getTokens();
