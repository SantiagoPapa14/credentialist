"use client";
import React, { useEffect, useState } from "react";
import CredentialsTable from '@/components/CredentialsTable';
import MyToolBar from "@/components/MyToolBar";
import '@/styles/globals.css';

const Home = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:3000/api/getUsernames");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const credentials = result.credentials;
        setData(credentials);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data) {
    console.log(data)
    return (
        <div style={{ height: 400, width: '100%' }}>
            <MyToolBar></MyToolBar>
            <CredentialsTable rows={data}></CredentialsTable>
	    </div>
    );
  } else {
    return <>No books available right now...</>;
  }
};

export default Home;