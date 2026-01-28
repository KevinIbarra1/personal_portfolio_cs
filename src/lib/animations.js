// Framer Motion animation variants for portfolio
// Performance: Uses transform properties (GPU-accelerated)

// Custom easing that matches the original CSS cubic-bezier(0.23, 1, 0.32, 1)
export const smoothEase = [0.23, 1, 0.32, 1];

// Fade up animation (replaces .animate-on-scroll)
export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

// Fade from left (replaces .animate-left)
export const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

// Fade from right (replaces .animate-right)
export const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

// Scale in (replaces .animate-scale)
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

// Stagger container for children animations
export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger item (child of stagger container)
export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

// Mobile menu variants
export const menuOverlay = {
  hidden: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.755, 0.05, 0.855, 0.06],
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

export const menuItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

export const menuContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const socialContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

export const socialItem = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: smoothEase },
  },
};

// Viewport settings for scroll animations
export const viewportOnce = { once: true, amount: 0.1, margin: "0px 0px -50px 0px" };

// Create delay variant for staggered items
export const createDelayedFadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase, delay },
  },
});
