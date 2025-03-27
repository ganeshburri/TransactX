import { PrismaClient } from "@repo/db/client";
const prisma = new PrismaClient();

export default function Page() {
  return (
    <div className="m-24">
      Hello from user-app
    </div>
  );
}
