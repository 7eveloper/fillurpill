"use client";
import { useEffect, useState } from "react";

const GoTopBtn = () => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);

    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showBtn) return null;

  return (
    <button className="fixed bottom-6 right-6" onClick={scrollToTop}>
      위로가기
    </button>
  );
};

export default GoTopBtn;
