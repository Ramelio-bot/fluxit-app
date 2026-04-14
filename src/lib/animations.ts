import { Variants } from "framer-motion";

export const antigravityHover: Variants = {
  rest: { 
    scale: 1, 
    y: 0,
    rotateX: 0,
    rotateY: 0,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)"
  },
  hover: { 
    scale: 1.05, 
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 240, 255, 0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

export const floatingEntry: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
