import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function Homepage() {
  const { user, token } = useAuth(); // get current user and token
  if (!user) return <div>Please log in</div>; // safety check

  const resetVegSelect = async () => {
    const confirmReset = window.confirm(
      "This will delete all your vegetables. Are you sure you want to continue?"
    );
    if (!confirmReset) return;

    try {
      const resetResponse = await fetch(`/api/users/${user.uid}/vegetables/reset`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // send Firebase token to backend
        },
      });

      if (resetResponse.ok) {
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
      <Header label="Homepage" />
      <Button
        onClick={resetVegSelect}
        type="button"
        label="DELETE VEG"
        variant="primary"
      />
    </div>
  );
}
