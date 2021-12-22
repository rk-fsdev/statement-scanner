export const getStyledFee = (cur: string): number => {
  let num = 0;
  let trimmedValue = '';
  trimmedValue = cur.replace('.', '').replace(/^0+/, '');
  num = parseInt(trimmedValue) / 100;
  return num;
};
