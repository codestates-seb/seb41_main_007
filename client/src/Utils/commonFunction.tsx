export const useNumberComma = (num: number) => {
  return [num].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
