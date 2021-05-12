import { TOKEN_LIB } from '../config'
import { getFile } from '@design-automata/node-figma'
const ROOT_FONT_SIZE = 16;

export const getTypography = async () => {
  let parsed = {};
  parsed = await getFile(TOKEN_LIB, { depth: 4 })
  .then((data: any) => {
    let typographyPage = data.document.children.find(child => child.name === 'typography' && child.type === 'CANVAS');

    let typography: any = {};
    let typographyCSS = {
      font: {},
      weight: {}
    };

    walkObject(typography, typographyPage);
    for (const size in typography.size) {
      typographyCSS.font[size] = CSS(typography.size[size]);
    }
    
    for (const weight in typography.weight) {
      let font = typography.weight[weight];
      let weightName = font.fontPostScriptName.split("-")[1].toLowerCase();
      typographyCSS.weight[weightName] = font.fontWeight;
    }

    return typographyCSS;
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

function CSS({ fontSize, lineHeightPx, letterSpacing }) {
  return {
    fontSize: {
      px: `${fontSize}px`,
      rem: `${fontSize / ROOT_FONT_SIZE}rem`
    },
    lineHeight: {
      px: `${lineHeightPx}px`,
      rem: `${lineHeightPx / ROOT_FONT_SIZE}rem`
    },
    letterSpacing: `${letterSpacing}px`
  };
}