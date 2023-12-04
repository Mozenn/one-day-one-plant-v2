export const capitalize = (stringToCapitalize: string) => {
  return stringToCapitalize
    ? stringToCapitalize
        .split(" ")
        .reduce(
          (prev, current, index) =>
            prev.concat(
              index == 0 ? "" : " ",
              current.slice(0, 1).toUpperCase(),
              current.slice(1)
            ),
          ""
        )
    : stringToCapitalize;
};
