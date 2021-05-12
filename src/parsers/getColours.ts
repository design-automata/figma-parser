import { TOKEN_LIB } from '../config'
import { getFile } from '@design-automata/node-figma'

export const getColours = async () => {
  let parsed = {};
  parsed = await getFile(TOKEN_LIB, { depth: 5 })
  .then((data: any) => {
    let colourPage = data.document.children.find(child => child.name === 'colour' && child.type === 'CANVAS');
    let colours = {};
    walkObject(colours, colourPage);
    return colours;
  })

  return parsed;
}

function walkObject(ref, object) {
  for (let i = 0; i < object.children.length; i++) {
    let node = object.children[i];
    if (node.children === undefined) {
      // end node, is design token
      node.fills[0].type === 'SOLID' ?
      ref[node.name] = node.fills[0].color :
      ref[node.name] = node.fills[0].gradientStops;
    } else {
      ref[node.name] = {};
      walkObject(ref[node.name], node);
    }
  }
}