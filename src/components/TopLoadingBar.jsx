import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";

const TopLoadingBar = () => {
  const navigation = useNavigation();
  const reduxLoading = useSelector((state) => state.auth.isPageLoading);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const isLoading = navigation.state === "loading" || reduxLoading;

  useEffect(() => {
    let interval;
    if (isLoading) {
      setTimeout(() => {
        setVisible(true);
        setProgress(10);
      }, 0);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 300);
    } else {
      setTimeout(() => {
        setProgress(100);
      }, 0);

      const timeout = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 500);
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!visible && !isLoading) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full z-[60] pointer-events-none overflow-hidden h-[3px] rounded-b-2xl">
      <div
        className="h-full bg-accent transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
};

export default TopLoadingBar;
