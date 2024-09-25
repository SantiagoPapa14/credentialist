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
        setData(result.credentials);
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
  }, []);

  if (loading) {
    return (
        <div className="loading-container">
            <h1 className="loading-message">Loading...</h1>
	      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
          <h1 className="error-message">Error: {error}</h1>
      </div>
  );
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
    return (
      <div className="empty-state-container">
          <h2 className="empty-state-message">No data available</h2>
      </div>
  );
  }
};

export default Home;