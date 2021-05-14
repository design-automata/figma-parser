import { LIB_31, PROP_REGEX } from '../config'
import { getFile } from '@design-automata/node-figma'

export const getSpacing = async () => {
  let parsed = {};
  parsed = getFile(LIB_31, { depth: 4 })
  .then((data: any) => {
    const spacingPage = data.document.children.find(child => child.name.includes("Spacing") && child.type === 'CANVAS');
    const spacingFrame = spacingPage.children.find(child => child.name === 'Spacing Tokens')
    const spacingLayers = spacingFrame.children.filter(child => child.name.includes("space"));
    const spacing = {};
    spacingLayers.forEach(({ name }) => {
      spacing[name] = {
        value: parseInt(name.split("-")[1]),
        valuePx: `${name.split("-")[1]}px`
      }
    })
    return spacing;
  })

  return parsed;
}
