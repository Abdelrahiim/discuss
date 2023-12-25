import { Button } from "@nextui-org/react";
import * as action from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/Profile";

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div>
        <h1>NoT Signed In</h1>
        <form action={action.signIn}>
          <Button type={"submit"}>SignIn</Button>
        </form>
        <Profile />
      </div>
    );
  }
  return (
    <div>
      <pre>
        <code>{JSON.stringify(session?.user)}</code>
      </pre>
      <form action={action.signOut}>
        <Button type={"submit"}>SignOut</Button>
      </form>
      <Profile />
    </div>
  );
}
