function countColor(countRange,colorRef) {
    const activeSht = SpreadsheetApp.getActiveSheet();
    const activeRg = SpreadsheetApp.getActiveRange();
    const activeformula = activeRg.getFormula();
    const countRangeAddress = activeformula.match(/\((.*)\,/).pop().trim();
    const backGrounds = activeSht.getRange(countRangeAddress).getBackgrounds();
    const colorRefAddress = activeformula.match(/\,(.*)\)/).pop().trim();
    const BackGround = activeSht.getRange(colorRefAddress).getBackground();
    
    let countCells = 0;
    backGrounds.forEach(bg => countCells += bg.filter(item => item === BackGround).length);
    
    return countCells;
};

function updateCounts(e) {
  const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  week.forEach(day => {
    if(rangeIntersect(SpreadsheetApp.getActiveSheet().getRange(day))) {
      countColor(SpreadsheetApp.getActiveSheet().getRange(day), e.range().getBackground());
    }
  });
}

function onChange(e) {
  updateCounts(e);
}

function onEdit(e) {
  updateCounts(e);
}

function rangeIntersect (R1, R2) {
  return R1.getLastRow() >= R2.getRow() && R2.getLastRow() >= R1.getRow() && R1.getLastColumn() >= R2.getColumn() && R2.getLastColumn() >= R1.getColumn();
}