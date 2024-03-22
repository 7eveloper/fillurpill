import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { alertMsgWithAction } from "@/lib/utils";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { ClipLoader } from "react-spinners";

export function AlertAuthResult({
  func,
  text,
  isPending,
  message,
}: {
  func: () => Promise<string[] | undefined>;
  text: string;
  isPending: boolean;
  message: string[];
}) {
  const handleClick = async () => {
    await func();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => {
            handleClick();
            alertMsgWithAction(
              text === "로그인" ? "로그인" : "회원가입",
              new Date().toLocaleString()
            );
          }}
        >
          {text}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isPending ? (
              <div className="flex justify-center">
                {text === "로그인" ? "로그인 중" : "회원가입 중"}
                <ClipLoader color="#36d7b7" className="mx-1" />
              </div>
            ) : (
              message[0]
            )}
          </AlertDialogTitle>
          {text === "회원가입" ? (
            <AlertDialogDescription>
              {isPending ? <></> : message[1]}
            </AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
