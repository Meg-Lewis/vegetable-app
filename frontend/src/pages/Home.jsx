import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import PageContainer from "../components/PageContainer";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { useSelectedVegetables } from "../context/SelectedVegetablesContext";
import TodoList from "../components/TodoList/TodoList";

export default function Homepage() {
  const { setSelectedVegetables } = useSelectedVegetables(); // get context function for selected vegetables
  const { user, token, loading } = useAuth(); // get current user and token
    if (loading) {
    // Don't show anything until auth state is ready
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <PageContainer>
      <Navbar/>
      <Header label="Homepage" />
      <div style={{ width: "200px", margin: "20px auto" }}>

      </div>
      <TodoList />
      </PageContainer>

    </div>
  );
}
