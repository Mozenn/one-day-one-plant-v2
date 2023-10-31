export const clamp = (value: number, rangeA: number, rangeB: number) => {
  return value < rangeA ? rangeA : value > rangeB ? rangeB : value;
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}