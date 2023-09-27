export type EncodedHM = string
export type DecodedHM = [number, number]

export const encodeHM = ([hour, minute]: DecodedHM): EncodedHM => `${hour}:${minute}`
