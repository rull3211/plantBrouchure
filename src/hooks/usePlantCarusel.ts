import { useCallback, useState } from "react";

export function usePlantCarousel(plantsLength: number) {
  const [index, setIndex] = useState(0);

  const handleNext = useCallback(() => {
    setIndex((prev) =>
      prev === plantsLength - 1 ? 0 : Math.min(prev + 1, plantsLength - 1)
    );
  }, [plantsLength]);

  const handlePrev = useCallback(() => {
    setIndex((prev) =>
      prev === 0 ? plantsLength - 1 : Math.max(prev - 1, 0)
    );
  }, [plantsLength]);

  return { index, handleNext, handlePrev, setIndex };
}