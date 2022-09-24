import { id } from "date-fns/locale";
import { differenceInDays, format, formatDistanceStrict } from "date-fns";

export function excerpt(worlds, to = 500, from = 0, separator = "...") {
  return worlds?.substring(from, to) + separator;
}

export function shortTimestamp(date) {
  const articleDate = new Date(date);
  const todayDate = new Date();

  if (differenceInDays(todayDate, articleDate) > 6) {
    return format(articleDate, "dd MMMM yyyy", { locale: id });
  }

  return formatDistanceStrict(articleDate, todayDate, {
    locale: id,
    addSuffix: true,
  });
}
