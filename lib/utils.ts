import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDecimalNumber = (num: number, decimalAmount: number = 2) => {
  if (num === null || num === undefined) {
    return '';
  }
  const numString = Math.abs(num).toString();
  const decimalString = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const resultArr = decimalString.split('.');
  const integerPart = resultArr[0] ?? '';
  let decimalPart = resultArr[1] ?? '';
  if (decimalPart.length) {
    if (decimalPart.length < decimalAmount) {
      while (decimalPart.length < decimalAmount) {
        decimalPart += '0';
      }
    }
    if (decimalPart.length > decimalAmount) {
      decimalPart = decimalPart.slice(0, decimalAmount);
    }
  } else {
    while (decimalPart.length < decimalAmount) {
      decimalPart += '0';
    }
  }
  return decimalAmount ? `${integerPart}.${decimalPart}` : integerPart;
};

export { formatDecimalNumber };
