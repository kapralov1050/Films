export function dateToYear(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()

  return year
}