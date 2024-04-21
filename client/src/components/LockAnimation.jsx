import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../assets/Animation.json"

const style = {
  height:100,
  padding:20,
};

const LockAnimation = () => {
  const options = {
    animationData: groovyWalkAnimation,
    loop: false,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default LockAnimation;