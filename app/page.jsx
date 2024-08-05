import {logout} from '@/lib/authLib';
import { redirect } from "next/navigation";

export default async function Home() {
  await logout();
  redirect("/login");
  return (
    <></>
  );
}
