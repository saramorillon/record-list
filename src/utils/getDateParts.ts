export function getDateParts(date: Date, formatter: Intl.DateTimeFormat) {
  const parts = formatter.formatToParts(date)
  return Object.fromEntries(parts.map((part) => [part.type, part.value]))
}
