import { TOKEN_LIB } from '../config'
import { getFile } from '@design-automata/node-figma'
import { RGBAto255, RGBAtoHEX, RGBAtoHSLA } from '@design-automata/colour-utils'

export const getColours = async () => {
  let parsed = {};
  parsed = await getFile(TOKEN_LIB, { depth: 5 })
  .then((data: any) => {
    let colourPage = data.document.children.find(child => child.name === 'colour' && child.type === 'CANVAS');
    let colours = {};
    walkObject(colours, colourPage);
    CSS(colours);
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

function CSS(ref) {
  for (const key in ref) {
    let node = ref[key];
    if (node.r !== undefined) {
      node.rgba = RGBAto255(node);
      node.hex = RGBAtoHEX(node);
      node.hsla = RGBAtoHSLA(node);
      delete node.r;
      delete node.g;
      delete node.b;
      delete node.a;
    } else if (Array.isArray(node)){
      // special case for gradients
      ref[key] = {};
      ref[key].rgba = `135deg, ${RGBAto255(node[0].color)} 0%, ${RGBAto255(node[1].color)} 100%`;
      ref[key].hex = `135deg, ${RGBAtoHEX(node[0].color)} 0%, ${RGBAtoHEX(node[1].color)} 100%`;
      ref[key].hsla = `135deg, ${RGBAtoHSLA(node[0].color)} 0%, ${RGBAtoHSLA(node[1].color)} 100%`;
    } else {
      CSS(node);
    }
  }
}