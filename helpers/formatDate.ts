export function dateToYear(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()

  return year
}

export function compareDates(a: string,b: string): number {
  const date1 = new Date(a)
  const date2 = new Date(b)
  if(date1.getTime() < date2.getTime()) {
    return -1
  } 
  if (date1.getTime() > date2.getTime()) {
    return 1
  }

  return 0
}

export function formatDate(dateStr: string) {
  if(dateStr === 'unknown') return 'unknown'
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
};