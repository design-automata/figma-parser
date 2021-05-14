import "regenerator-runtime/runtime"
import * as fs from 'fs'
import { LIB_31 } from './config'
import { getColours, getTypography, getElevation, getGrid } from './parsers'
import { getFileStyles } from "@design-automata/node-figma"

const getTokens = async () => {
  // get all styles
  let fileStyles = await getFileStyles(LIB_31).then((data: any) => data.meta.styles);

  let colours = await getColours();
  let typography = await getTypography(fileStyles);
  let elevation = await getElevation(fileStyles);
  let grid = await getGrid(fileStyles);

  fs.writeFile(`${process.cwd()}/tokens/colours.json`, JSON.stringify(colours, null, '\t'), err => console.log(err));

  fs.writeFile(`${process.cwd()}/tokens/typography.json`, JSON.stringify(typography, null, '\t'), err => console.log(err));

  fs.writeFile(`${process.cwd()}/tokens/elevation.json`, JSON.stringify(elevation, null, '\t'), err => console.log(err));

  fs.writeFile(`${process.cwd()}/tokens/grid.json`, JSON.stringify(grid, null, '\t'), err => console.log(err));
}

if (!fs.existsSync(`${process.cwd()}/tokens`)){
  fs.mkdirSync(`${process.cwd()}/tokens`);
}

getTokens();