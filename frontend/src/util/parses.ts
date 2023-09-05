export const parseLikes = (likes: number) => {
  if (likes > 1000) {
    const thousands = Math.floor(likes / 1000);
    const hundreds = Math.floor((likes / 1000 - thousands) * 10);
    if (hundreds === 0) {
      return `${thousands} k`;
    } else {
      return `${thousands}.${hundreds} k`;
    }
  }
  return likes.toString();
};
