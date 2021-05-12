import "regenerator-runtime/runtime"
import * as fs from 'fs'
import { getColours } from './parsers/getColours'

const getTokens = async () => {
  let colours = await getColours();

  fs.writeFile(`${process.cwd()}/tokens/colours.json`, JSON.stringify(colours, null, '\t'), err => console.log(err));
}

if (!fs.existsSync(`${process.cwd()}/tokens`)){
  fs.mkdirSync(`${process.cwd()}/tokens`);
}

getTokens();