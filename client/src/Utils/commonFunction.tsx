import jwt_decode from 'jwt-decode';

export const tokenDecode = (token: string) => {
  return jwt_decode(token);
};

export const useNumberComma = (num: number) => {
  return [num].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const customTime = (getedValue: Date | number | string) => {
  const date =
    typeof getedValue === 'object' ? getedValue : new Date(getedValue);
  const now = new Date();
  const timeGap = now.getTime() - date.getTime();
  if (timeGap < 60000) {
    return `${Math.floor(timeGap / 1000)}초전`;
  } else if (timeGap < 3600000) {
    return `${Math.floor(timeGap / 60000)}분전`;
  } else if (timeGap < 86400000) {
    return `${Math.floor(timeGap / 3600000)}시간전`;
  } else if (timeGap < 345600000) {
    return `${Math.floor(timeGap / 86400000)}일전`;
  } else {
    return date.toLocaleDateString('ko');
  }
};

export default function isEmptyObj(obj: any) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
}

export function includes_FC(target: any, word: any) {
  return target.includs(word);
}
