import { scrollToElement } from "@utils/common-functions";
import React, { memo, useEffect } from "react";

export interface AnimationOnSkrollPropsTypes {
  animationBoxRef?: any;
  setIsVisible?: any;
  initialSkrollRef?: any;
}

const AnimationOnSkroll = ({
  animationBoxRef,
  setIsVisible,
  initialSkrollRef = null,
}: AnimationOnSkrollPropsTypes) => {
  useEffect(() => {
    scrollToElement(initialSkrollRef);

    const handleScroll = () => {
      const element = animationBoxRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight + 50;
        if (
          rect.top < windowHeight * 2 &&
          rect.bottom > 0 &&
          rect.top < windowHeight
        ) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div></div>;
};

export default memo(AnimationOnSkroll);
