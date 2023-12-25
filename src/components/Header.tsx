import Link from "next/link";
import * as actions from "@/actions";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
} from "@nextui-org/react";
import { auth } from "@/auth";
import paths from "@/paths";
import { ReactNode } from "react";

const Header = async () => {
  const session = await auth();
  let authContent: ReactNode;
  if (session?.user) {
    authContent = <Avatar src={session?.user.image || ""} />;
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href={paths.home()} className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input placeholder="Search ..." />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">{authContent}</NavbarContent>
    </Navbar>
  );
};

export default Header;
