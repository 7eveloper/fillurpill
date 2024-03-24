"use client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
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
    <button
      className="fixed bottom-6 right-6 border rounded-full shadow-sm p-2 bg-background"
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="w-10 h-10" />
    </button>
  );
};

export default GoTopBtn;
