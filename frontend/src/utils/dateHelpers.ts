interface DateTimeFormatOptions {
  localeMatcher?: "best fit" | "lookup";
  weekday?: "long" | "short" | "narrow";
  era?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "long" | "short";
  formatMatcher?: "best fit" | "basic";
  hour12?: boolean;
  timeZone?: string;
}

export const convertToDate = (value) => {

  if (!value) return undefined;
  if (typeof value === 'object' && value.getDate()) {
    return new Date(value);
  } else if (typeof value === 'number') {
    return new Date(value);
  } else if (typeof value === 'string' && value.length >= 10) {
    return new Date(value);
  }
  return undefined;
}

export const genericDateToRusDateTime = (input, needSeconds?) => {
  const options: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  };

  let date = convertToDate(input);
  if (date && date instanceof Date) {
    let datetime = date.toLocaleTimeString("ru", options).split(', ').join(' ')

    if (!needSeconds) {
      datetime = datetime.substr(0, 16)
    }
    return datetime;
  }

  return '';
}