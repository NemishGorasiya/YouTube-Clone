import {
  add,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  intervalToDuration,
} from "date-fns";

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
  return formatDistanceToNowStrict(time, { addSuffix: true });
};

export const handleFallBackImage = (event, fallBackImage) => {
  event.target.src = fallBackImage;
};

export const customParser = (str) => {
  let modifiesString;
  modifiesString = str.replace(/\*(.*?)\*/g, "<b>$1</b>");
  modifiesString = modifiesString.replaceAll("\n", "<br/>");
  return modifiesString;
};

export const formatDate = (date) => {
  if (date === "" || date === undefined) {
    return "";
  }
  const dateToFormat = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dateToFormat);
  return formattedDate;
};

const formatNumber = (number) => {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
};

export const isoDurationToDDHHMM = (isoDuration) => {
  const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  const days = parseInt(matches[1] || 0, 10);
  const hours = parseInt(matches[2] || 0, 10);
  const minutes = parseInt(matches[3] || 0, 10);
  const seconds = parseInt(matches[4] || 0, 10);

  return `${days ? `${formatNumber(days)}:` : ""}${
    hours || days ? `${formatNumber(hours)}:` : ""
  }${formatNumber(minutes)}:${formatNumber(seconds)}`;
};
