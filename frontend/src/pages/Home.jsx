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

  const resetVegSelect = async () => {
    const confirmReset = window.confirm(
      "This will delete all your vegetables. Are you sure you want to continue?"
    );
    if (!confirmReset) return;

    try {
      const resetResponse = await fetch(`http://127.0.0.1:8000/vegetables/users/vegetables/reset`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // send Firebase token to backend
        },
      });

      if (resetResponse.ok) {
        setSelectedVegetables([]); // Clear front end context
        alert("Your selection has been reset!");
        // Ponteitally redirect to veg select
      } else {
        alert("Something went wrong during resetting your selection.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      alert("An error occurred while resetting your selection.");
    }
  };

  return (
    <div>
      <PageContainer>
      <Navbar/>
      <Header label="Homepage" />
      <div style={{ width: "200px", margin: "20px auto" }}>
      {/* <Button
        onClick={resetVegSelect}
        type="button"
        label="DELETE VEG"
        variant="secondary"
      /> */}
      </div>
      <TodoList />
      </PageContainer>

    </div>
  );
}
