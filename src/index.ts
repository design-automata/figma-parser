import "regenerator-runtime/runtime"
import * as fs from 'fs'
import { getColours, getTypography, getElevation } from './parsers'

const getTokens = async () => {
  let colours = await getColours();
  let typography = await getTypography();
  let elevation = await getElevation();

  fs.writeFile(`${process.cwd()}/tokens/colours.json`, JSON.stringify(colours, null, '\t'), err => console.log(err));

  fs.writeFile(`${process.cwd()}/tokens/typography.json`, JSON.stringify(typography, null, '\t'), err => console.log(err));

  fs.writeFile(`${process.cwd()}/tokens/elevation.json`, JSON.stringify(elevation, null, '\t'), err => console.log(err));
}

if (!fs.existsSync(`${process.cwd()}/tokens`)){
  fs.mkdirSync(`${process.cwd()}/tokens`);
}

getTokens();