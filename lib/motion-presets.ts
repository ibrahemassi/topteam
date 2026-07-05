export const webfolioEase = [0.76, 0, 0.24, 1] as const;

export const webfolioTransition = {
  duration: 0.4,
  ease: webfolioEase,
};

export const fadeSlideUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
  transition: webfolioTransition,
};

export const fadeSlideUpSoft = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { ...webfolioTransition, duration: 0.35 },
};

export const coachCardReveal = {
  initial: { opacity: 0, y: 36, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
  transition: webfolioTransition,
};

export const panelReveal = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { ...webfolioTransition, duration: 0.45 },
};
