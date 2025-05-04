export const formatTitle = (title: string) => {
    return title
    .split('_')
    .map((item) => {
      return item[0].toUpperCase() + item.slice(1, item.length);
    })
    .join(' ');
}