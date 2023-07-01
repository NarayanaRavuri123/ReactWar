export const getProperty = (o: any, p: string) => {
  return o[p] ? o[p] : undefined;
}

export const getDeepClone = (o: any) => {
  return JSON.parse(JSON.stringify(o));
}