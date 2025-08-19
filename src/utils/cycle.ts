export function cycleIndex(index: number, step: number, length: number): number {
  if (length <= 0) throw new Error("Length must be positive");
  
  return (index + step + length) % length;
}