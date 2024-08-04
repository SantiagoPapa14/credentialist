'use server';
import { selectServicesAndUsernames } from "@/lib/dataLib";
import MyDataGrid from "@/components/MyDataGrid";
import MyToolBar from "@/components/MyToolBar";
import '@/styles/globals.css';

export default async function Home() {
    const rows = await selectServicesAndUsernames();
    return (
        <div style={{ height: 400, width: '100%' }}>
            <MyToolBar></MyToolBar>
            <MyDataGrid rows={rows}></MyDataGrid>
        </div>
    );
}
