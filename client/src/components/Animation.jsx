import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../assets/cool-animation2.json"

const style = {
  height:500,
  padding:20,
};

const Animation = () => {
  const options = {
    animationData: groovyWalkAnimation,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default Animation;