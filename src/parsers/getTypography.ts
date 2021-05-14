import { LIB_31, PROP_REGEX } from '../config'
import { getFileNodes } from '@design-automata/node-figma'
const ROOT_FONT_SIZE = 16;

export const getTypography = async (fileStyles) => {
  const textStyles = fileStyles.filter(style => style.style_type === 'TEXT');
  const textStyleNodes = textStyles.map(style => style.node_id);
  let parsed = {};
  
  parsed = await getFileNodes(LIB_31, textStyleNodes)
  .then((data: any) => {
    const docArr = Object.values(data.nodes).map((node: any) => node.document);
    let typography = {};
    docArr.forEach(doc => {
      // check if text style has multiple weights
      if (typography[doc.name.split("/")[0]] === undefined) {
        typography[doc.name.split("/")[0]] = {
          fontFamily: doc.style.fontFamily,
          fontSizePx: doc.style.fontSize,
          fontSizeRem: doc.style.fontSize / ROOT_FONT_SIZE,
          letterSpacing: doc.style.letterSpacing,
          lineHeightPx: doc.style.lineHeightPx
        };
      }
    })
    return typography;
  })

  return parsed;
}
