import { TOKEN_LIB } from '../config'
import { getFile } from '@design-automata/node-figma'

export const getElevation = async () => {
  let parsed = {};
  parsed = await getFile(TOKEN_LIB, { depth: 3 })
  .then((data: any) => {
    let elevationPage = data.document.children.find(child => child.name === 'elevation' && child.type === 'CANVAS');

    let elevation = {};
    elevationPage.children.forEach(element => {
      elevation[element.name] = element.effects;
    });
    return elevation;
  })

  return parsed;
}