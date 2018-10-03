export function random(max: number): number {
  return Math.floor(Math.random() * max);
}
export function pickOne<T>(list: T[]): T {
  var length = list.length;

  return list[random(length)];
}
