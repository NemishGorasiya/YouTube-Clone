import { formatDistanceToNow } from "date-fns";

export const formatCompactNumber = (number) => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
};

export function debounce(func, delay = 500) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const calcDistanceToNow = ({ time }) => {
  return formatDistanceToNow(time, { addSuffix: true });
};

export const handleFallBackImage = (event, fallBackImage) => {
  event.target.src = fallBackImage;
};

export const customParser = (str) => {
  const asteriskToBold = str.replace(/\*(.*?)\*/g, "<b>$1</b>");
  return asteriskToBold;
};
