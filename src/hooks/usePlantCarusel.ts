import { useEffect, useState } from "react";


export function usePlantCarousel(plantsLength: number) {
  const [position, setPosition] = useState(1); // start on first real slide
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [queue, setQueue] = useState(0);
  const [transitionSpeed, setTransitionSpeed] = useState(0.5);

  const handleNext = () => setQueue((q) => q + 1);
  const handlePrev = () => setQueue((q) => q - 1);

  // process queue
  useEffect(() => {
    if (!isTransitioning && queue !== 0) {
      setIsTransitioning(true);

      // adaptive speed: faster if more than 2 queued
      setTransitionSpeed(Math.abs(queue) > 2 ? 0.2 : 0.5);

      setPosition((prev) => prev + Math.sign(queue));
      setQueue((q) => q - Math.sign(queue)); // consume one step
    }
  }, [queue, isTransitioning]);

  const handleTransitionEnd = () => {
    if (position === plantsLength + 1) {
      setIsTransitioning(false);
      setPosition(1); // jump back to real first
      return;
    }
    if (position === 0) {
      setIsTransitioning(false);
      setPosition(plantsLength); // jump back to real last
      return;
    }
    setIsTransitioning(false);
  };

  return {handleNext, handlePrev, handleTransitionEnd, transitionSpeed , isTransitioning, position}
}