import { LIB_31 } from '../config'
import { getFileNodes } from '@design-automata/node-figma'

export const getGrid = async (fileStyles) => {
  const gridStyles = fileStyles.filter(style => style.style_type === 'GRID');
  const gridStyleNodes = gridStyles.map(style => style.node_id).join(",");
  let parsed = {};
  
  parsed = await getFileNodes(LIB_31, gridStyleNodes)
  .then((data: any) => {
    const docArr: any = Object.values(data.nodes).map((node: any) => node.document);
    let grid = {};
    docArr.forEach(({ name, layoutGrids }) => {
      let columnLayout = layoutGrids.find(grid => grid.pattern === "COLUMNS");
      let rowLayout = layoutGrids.find(grid => grid.pattern === "ROWS");

      grid[name] = {
        gridTemplateColumns: `repeat(${columnLayout.count}, ${columnLayout.sectionSize}px)`,
        columnGap: `${columnLayout.gutterSize}px`,
        gridAutoRows: rowLayout ? `${rowLayout.sectionSize}px` : '',
        rowGap: rowLayout ? `${rowLayout.gutterSize}px` : '',
        columnOffset: `${columnLayout.offset}px`
      }
    })
    return grid;
  })

  return parsed;
}