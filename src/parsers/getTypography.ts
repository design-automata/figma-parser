import { TOKEN_LIB } from '../config'
import { getFile } from '@design-automata/node-figma'

export const getTypography = async () => {
  let parsed = {};
  parsed = await getFile(TOKEN_LIB, { depth: 5 })
  .then((data: any) => {
    let typographyPage = data.document.children.find(child => child.name === 'typography' && child.type === 'CANVAS');

    let typography = {};
    walkObject(typography, typographyPage);
    return typography;
  })

  return parsed;
}

function walkObject(ref, object) {
  if (object.children === undefined) {
    // reached end node, is design token
    Object.assign(ref, object.style);
  } else {
    for (let i = 0; i < object.children.length; i++) {
      ref[object.children[i].name] = {};
      walkObject(ref[object.children[i].name], object.children[i]);
    }
  }
}