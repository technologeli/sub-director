export const capitalize = (str: string) => {
  if (str.length === 0) return str;
  return str[0]?.toLocaleUpperCase() + str.substring(1);
};

export const capitalizeEachWord = (str: string) => {
  if (str.length === 0) return str;
  let newstr = "";
  str.split(" ").forEach((word) => {
    newstr += capitalize(word);
  });
  return newstr;
};
