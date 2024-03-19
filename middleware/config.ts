import { isThereServerSession } from "@/hooks/session";
import { NextRequest } from "next/server";

const AuthMiddleware = async (req: NextRequest) => {
  const { session } = await isThereServerSession();

  if (!session) {
  }
};

export default AuthMiddleware;
