import {logout} from '@/lib/authLib';
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/login");
  return (
    <></>
  );
}
