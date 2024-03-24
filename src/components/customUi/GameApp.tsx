"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchBar from "../product/SearchBar";

const W = 500;
const H = 500;
const VELOCITY = {
  basket: {
    left: 5,
    right: 5,
  },
  pillAcc: 0.01,
};
const CREATE_PILL_TIME = 500;
const PILL_SCORE = 50;

type ItemPosition = {
  x: number;
  y: number;
  w: number;
  h: number;
};

const GameApp = () => {
  const [state, setState] = useState<"play" | "pause" | "stop">("stop");
  const [score, setScore] = useState(0);
  const [abandoned, setAbandoned] = useState(0);

  const ref = useRef<HTMLCanvasElement>(null);
  const basketRef = useRef<HTMLImageElement>(null);
  const pillRef = useRef<HTMLImageElement>(null);
  const pillSizeRef = useRef({ w: 0, h: 0 });
  const positionRef = useRef<{
    pills: ItemPosition[];
    pillAcc: number[];
    basket: ItemPosition;
  }>({
    pills: [],
    pillAcc: [],
    basket: { x: 0, y: 0, w: 0, h: 0 },
  });

  const keyRef = useRef({
    isLeft: false,
    isRight: false,
  });

  const drawImage = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      { x, y, w, h }: ItemPosition
    ) => {
      ctx.drawImage(img, x, y, w, h);
    },
    []
  );

  const loadImage = useCallback(
    (src: string) =>
      new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      }),
    []
  );

  const blockOverflowPosition = useCallback((position: ItemPosition) => {
    position.x =
      position.x + position.w >= W
        ? W - position.w
        : position.x < 0
        ? 0
        : position.x;
    position.y =
      position.y + position.h >= H
        ? H - position.h
        : position.y < 0
        ? 0
        : position.y;
  }, []);

  const updateBasketPosition = useCallback(
    (basketPosition: ItemPosition) => {
      const key = keyRef.current;
      if (key.isLeft) basketPosition.x -= VELOCITY.basket.left;
      if (key.isRight) basketPosition.x += VELOCITY.basket.right;
      blockOverflowPosition(basketPosition);
    },
    [blockOverflowPosition]
  );

  const createPill = useCallback(() => {
    if (!pillRef.current) return;
    const size = pillSizeRef.current;
    positionRef.current.pills.push({
      x: Math.random() * (W - size.w),
      y: -size.h,
      ...size,
    });
    positionRef.current.pillAcc.push(1);
  }, []);

  const updatePillPosition = useCallback(
    (pillPosition: ItemPosition, index: number) => {
      const y = pillPosition.y;
      const acc = positionRef.current.pillAcc[index];
      positionRef.current.pillAcc[index] = acc + acc * VELOCITY.pillAcc;
      pillPosition.y = y + acc;
    },
    []
  );

  const deletePill = useCallback((index: number) => {
    positionRef.current.pills.splice(index, 1);
    positionRef.current.pillAcc.splice(index, 1);
  }, []);

  const catchPill = useCallback(
    (pillPosition: ItemPosition, index: number) => {
      const basketPosition = positionRef.current.basket;
      if (
        basketPosition.x + basketPosition.w >= pillPosition.x &&
        basketPosition.x <= pillPosition.x + pillPosition.w &&
        basketPosition.y + basketPosition.h >= pillPosition.y &&
        basketPosition.y <= pillPosition.y + pillPosition.h
      ) {
        deletePill(index);
        setScore((prevScore) => prevScore + PILL_SCORE);
      }
    },
    [deletePill]
  );

  const initialGame = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, W, H);
    const { w, h } = positionRef.current.basket;
    positionRef.current.pillAcc = [];
    positionRef.current.pills = [];
    positionRef.current.basket = {
      x: W / 2 - w / 2,
      y: H - h,
      w,
      h,
    };
    keyRef.current.isLeft = false;
    keyRef.current.isRight = false;
  }, []);

  useEffect(() => {
    const cvs = ref.current;
    const ctx = cvs?.getContext("2d");

    state === "stop" && ctx && initialGame(ctx);
    if (!cvs || !ctx || state !== "play") return;

    !basketRef.current &&
      loadImage("/images/basket.png").then((img) => {
        (basketRef as any).current = img;
        const w = 78;
        const h = 52;
        positionRef.current.basket = {
          x: W / 2 - w / 2,
          y: H - h,
          w,
          h,
        };
      });

    !pillRef.current &&
      loadImage("/images/pill.png").then((img) => {
        (pillRef as any).current = img;
        pillSizeRef.current.w = 50;
        pillSizeRef.current.h = 20;
      });

    let timer: number | undefined;
    let rafTimer: number | undefined;

    const position = positionRef.current;
    const animate = () => {
      const basket = basketRef.current;
      const pill = pillRef.current;

      ctx.clearRect(0, 0, W, H);

      if (basket) {
        updateBasketPosition(position.basket);
        drawImage(ctx, basket, position.basket);
      }
      if (pill) {
        position.pills.forEach((pillPosition, index) => {
          updatePillPosition(pillPosition, index);
          drawImage(ctx, pill, pillPosition);
        });
        position.pills.forEach((pillPosition, index) => {
          if (pillPosition.y >= H) {
            deletePill(index);
            setAbandoned((prevAbandoned) => prevAbandoned + 1);
          } else {
            catchPill(pillPosition, index);
          }
        });
      }
      rafTimer = requestAnimationFrame(animate);
    };

    rafTimer = requestAnimationFrame(animate);
    timer = window.setInterval(createPill, CREATE_PILL_TIME);

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      keyRef.current.isLeft = key === "a" || key === "arrowleft";
      keyRef.current.isRight = key === "d" || key === "arrowright";
    };

    const onKeyUp = () => {
      keyRef.current.isLeft = false;
      keyRef.current.isRight = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    if (abandoned === 10) {
      setState("stop");
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      timer && window.clearInterval(timer);
      timer = undefined;
      rafTimer && cancelAnimationFrame(rafTimer);
      rafTimer = undefined;
    };
  }, [
    drawImage,
    loadImage,
    updateBasketPosition,
    createPill,
    updatePillPosition,
    deletePill,
    catchPill,
    state,
    initialGame,
    abandoned,
    score,
  ]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center justify-center px-8 w-fit h-fit">
        <div className="flex flex-row items-center justify-center w-[500px] my-3 border border-black border-solid rounded-lg p-6 bg-white">
          <Button className="mx-3" onClick={() => setState("pause")}>
            PAUSE
          </Button>
          <Button
            className="mx-3"
            onClick={() => {
              setState("play");
              setScore(0);
              setAbandoned(0);
            }}
          >
            PLAY
          </Button>
          <Button className="mx-3" onClick={() => setState("stop")}>
            STOP
          </Button>
        </div>
        <Card className="w-[500px] border border-black border-solid rounded-lg p-5 my-3 bg-white">
          <CardTitle className="text-center">Current Score</CardTitle>
          <CardContent>
            <p className="text-right mr-[150px] mt-5">점수 : {score}</p>
            <p className="text-right mr-[150px]">
              버려진 알약 수 : {abandoned}
            </p>
          </CardContent>
        </Card>
        <canvas
          className="block mx-auto my-3 border border-black border-solid rounded-lg bg-white"
          ref={ref}
          width={W}
          height={H}
        />
      </div>
      <div className="flex flex-col items-center justify-center p-10 w-screen">
        {abandoned === 10 ? (
          <img
            src="/images/gameover.png"
            alt="logo"
            className="mb-10 w-[30vw]"
          />
        ) : (
          <img src="/images/logo.png" alt="logo" className="mb-10 w-[30vw]" />
        )}

        <SearchBar searchType="function" />
      </div>
    </div>
  );
};

export default GameApp;
