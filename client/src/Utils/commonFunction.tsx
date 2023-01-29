export const useNumberComma = (num: number) => {
  return [num].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const customTime = (getedValue: Date | number) => {
  const date =
    typeof getedValue === 'object' ? getedValue : new Date(getedValue);
  const now = new Date();
  const timeGap = now.getTime() - date.getTime();
  if (timeGap < 60000) {
    return `${Math.floor(timeGap / 1000)}秒前`;
  } else if (timeGap < 3600000) {
    return `${Math.floor(timeGap / 60000)}分前`;
  } else if (timeGap < 86400000) {
    return `${Math.floor(timeGap / 3600000)}時間前`;
  } else if (timeGap < 345600000) {
    return `${Math.floor(timeGap / 86400000)}日前`;
  } else {
    return date.toLocaleDateString('ja');
  }
};
