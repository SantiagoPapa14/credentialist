'use server';
import * as React from 'react';
import { selectServicesAndUsernames } from "@/lib/dataLib";
import MyDataGrid from "@/components/MyDataGrid";
import '@/styles/globals.css';

export default async function Home() {
    const rows = await selectServicesAndUsernames();
    return (
        <div style={{ height: 400, width: '100%' }}>
            <MyDataGrid rows={rows}></MyDataGrid>
        </div>
    );
}
