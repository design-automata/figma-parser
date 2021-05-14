import "regenerator-runtime/runtime"
import * as fs from 'fs'
import { LIB_31 } from './config'
import { getColours, getTypography, getElevation, getGrid, getSpacing } from './parsers'
import { getFileStyles } from "@design-automata/node-figma"

const getTokens = async () => {
  // get all styles
  const fileStyles = await getFileStyles(LIB_31).then((data: any) => data.meta.styles);

  const tokens = {
    colours: await getColours(),
    typography: await getTypography(fileStyles),
    elevation: await getElevation(fileStyles),
    grid: await getGrid(fileStyles),
    spacing: await getSpacing()
  }

  // individual files
  for (const key in tokens) {
    fs.writeFile(`${process.cwd()}/tokens/${key}.json`, JSON.stringify(tokens[key], null, '\t'), err => console.log(err));
  }

  // all
  fs.writeFile(`${process.cwd()}/tokens/all.json`, JSON.stringify(tokens, null, '\t'), err => console.log(err));
}

if (!fs.existsSync(`${process.cwd()}/tokens`)){
  fs.mkdirSync(`${process.cwd()}/tokens`);
}

getTokens();