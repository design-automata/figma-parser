import { LIB_31 } from '../config'
import { getFileNodes, getFileStyles } from '@design-automata/node-figma'
const ROOT_FONT_SIZE = 16;

export const getTypography = async () => {
  let parsed = {};
  const nodeIds = await getFileStyles(LIB_31)
  .then((data: any) => {
    const textStyles = data.meta.styles.filter(style => style.style_type === 'TEXT');
    return textStyles.map(style => style.node_id);
  })

  parsed = await getFileNodes(LIB_31, nodeIds)
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
