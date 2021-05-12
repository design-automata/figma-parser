import { TOKEN_LIB } from '../config'
import { getFile } from '@design-automata/node-figma'
import { RGBAto255 } from '@design-automata/colour-utils'

export const getElevation = async () => {
  let parsed = {};
  parsed = await getFile(TOKEN_LIB, { depth: 3 })
  .then((data: any) => {
    let elevationPage = data.document.children.find(child => child.name === 'elevation' && child.type === 'CANVAS');

    let elevation = {};
    let elevationCSS = {};
    elevationPage.children.forEach(element => {
      elevation[element.name] = element.effects;
    });
    for (const key in elevation) {
      elevationCSS[key] = effectsToCSS(elevation[key]);
    }
    return elevationCSS;
  })

  return parsed;
}

function effectsToCSS(effectsArr) {
  let reversedEffectsArr = effectsArr.reverse();
  let CSSString = reversedEffectsArr.map(({ color, offset, radius, spread}) => `${offset.x}px ${offset.y}px ${radius ? radius : '0'}px ${spread ? spread : '0'}px ${RGBAto255(color)}`);
  return CSSString.join(", ");
}