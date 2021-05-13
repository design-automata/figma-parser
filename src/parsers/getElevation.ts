import { LIB_31 } from '../config'
import { getFileNodes } from '@design-automata/node-figma'
import { RGBAto255 } from '@design-automata/colour-utils'

export const getElevation = async (fileStyles) => {
  const elevationStyles = fileStyles.filter(style => style.style_type === 'EFFECT' && style.name.toLowerCase().includes('elevation'));
  const elevationStyleNodes = elevationStyles.map(style => style.node_id).join(",");
  let parsed = {};
  
  parsed = await getFileNodes(LIB_31, elevationStyleNodes)
  .then((data: any) => {
    const docArr = Object.values(data.nodes).map((node: any) => node.document);
    let elevation = {};
    let elevationCSS = {};

    docArr.forEach(doc => {
      // "Elevation 1" -> "elevation-1"
      const effectName = doc.name.split(" ").join("-").toLowerCase();
      elevation[effectName] = doc.effects;
    })

    for (const key in elevation) {
      elevationCSS[key] = effectsToCSS(elevation[key]);
    }

    return elevationCSS;
  })

  return parsed;
}

function effectsToCSS(effectsArr) {
  let reversedEffectsArr = effectsArr.reverse();
  let CSSString = reversedEffectsArr.map(({ color, offset, radius, spread }) => `${offset.x}px ${offset.y}px ${radius ? radius : '0'}px ${spread ? spread : '0'}px ${RGBAto255(color)}`);
  return CSSString.join(", ");
}
