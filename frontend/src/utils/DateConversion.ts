export const toShortDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
