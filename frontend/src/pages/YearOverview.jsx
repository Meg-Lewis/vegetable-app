import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import PageContainer from "../components/PageContainer";
import { useAuth } from "../context/AuthContext";
import YearGrid from "../components/YearGrid";

export default function YearOverview() {
  const { user, token, loading } = useAuth();
  const [vegetables, setVegetables] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch("/api/year-overview", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setVegetables(data));
  }, [user, token]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <PageContainer>
      <Navbar />
      <Header label="Year Overview" />
      <YearGrid vegetables={vegetables} />
    </PageContainer>
  );
}
