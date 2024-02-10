export const devLog = (message?: any, ...optionalParams: any[]): void => {
  process.env.NODE_ENV !== "production" && console.log(message, optionalParams);
};
