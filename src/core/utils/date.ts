export function differenceInDays(from: Date, to: Date): number {
  const diffInMilliseconds = to.getTime() - from.getTime()

  return diffInMilliseconds / (1000 * 60 * 60 * 24)
}
