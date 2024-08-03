'use server';
import * as React from 'react';
import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib/authLib";
import { selectServicesAndUsernames } from "@/lib/sqlLib";
import MyDataGrid from "@/components/MyDataGrid";
import '@/styles/globals.css';

export default async function Home() {
  const session = await getSession();
    if(session == null || session == undefined){
        redirect("/");
        return null;
    }else if(session.hasLogged == 1404039529){
        const rows = await selectServicesAndUsernames();
        return (
            <div style={{ height: 400, width: '100%' }}>
                <MyDataGrid rows={rows}></MyDataGrid>
            </div>
        );
    }
}
