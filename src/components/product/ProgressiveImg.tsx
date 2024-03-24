"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const ProgressiveImg = ({ src }: { src: string }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  if (imgSrc === undefined)
    return <Skeleton className="h-[300px] w-[320px] rounded-none" />;

  return <img src={src} className="w-80 h-[300px] border-b-2" />;
};
export default ProgressiveImg;
