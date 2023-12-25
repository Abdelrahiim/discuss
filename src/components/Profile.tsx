"use client";
import { useSession } from "next-auth/react";

const Profile = () => {
  const session = useSession();
  if (session.data?.user) {
    return <div>From Client ; user is Signed in</div>;
  }
  return <div>From Client ; user is not Signed in</div>;
};

export default Profile;
