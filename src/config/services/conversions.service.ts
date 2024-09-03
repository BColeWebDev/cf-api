/**  Convert Unit of measurement
 * Options: inches -> cm.
 * @param num num
 */
export const convertMeasurment = (num: number): number => {
  const centimeters: number = num * 2.54;
  return Math.round(centimeters);
};
/**  Convert Unit of weight
 * Options: ibs -> kg.
 * @param num num
 */
export const convertWeight = (num: number): number => {
  const kilograms: number = num * 0.453592;
  return Math.round(kilograms);
};
/**  Convert Unit of distance
 * Options: miles -> km.
 * @param num num
 */
export const convertDistance = (num: number): number => {
  const kilometer: number = num * 1.609344;
  return Math.round(kilometer);
};
