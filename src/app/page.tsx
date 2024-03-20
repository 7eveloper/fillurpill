import GameApp from "@/components/GameApp";
import { AlertDemo } from "@/components/shadcn/AlertDemo";

export default async function Home() {
  return (
    <>
    <GameApp />
      <AlertDemo />
    </>
  );
}
