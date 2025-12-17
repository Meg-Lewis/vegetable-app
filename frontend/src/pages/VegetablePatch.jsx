import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import PageContainer from "../components/PageContainer";
import Flex from "../components/Flexbox";
import Text from "../components/Text";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import { useSelectedVegetables } from "../context/SelectedVegetablesContext";
import Logo from "../components/Logo"; 
import axios from "axios";
import "../styles/VegetablePatch.css"; 
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext"
import { Link } from 'react-router-dom';


export default function VegetablePatch() {
  const { selectedVegetables, setSelectedVegetables } = useSelectedVegetables();
  const navigate = useNavigate();
  const { token } = useAuth();


  // Fetch vegetables ONCE when the page loads
  //----------------------------------------------------------------------
  useEffect(() => {
    axios
      .get("http://localhost:8000/vegetables/user", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setSelectedVegetables(response.data))
      .catch((error) => {
        console.log("Token right before request:", token);
        console.log("Axios request headers:", error.config?.headers);
        console.error("Failed to load saved vegetables:", error);
      });
      }, [setSelectedVegetables]);

  const handleClickVegetable = (vegId) => {
    navigate(`/${vegId}`);
  };

  // RESET VEG SELECTION
  //----------------------------------------------------------------------
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
      <Container>

          <Header label="Your Veg Patch" />
          </Container>
          <Flex direction="column" gap="2rem" align="center" justify="center">

          {selectedVegetables.length === 0 ? (
            <div>
              <Text size="medium">No vegetables selected yet.</Text>
              <Button
                onClick={() => navigate("/veg-select")}
                label="Select Vegetables"
                variant="secondary"
              />
            </div>
          ) : (
            <div className="veg-grid">
              {selectedVegetables.map((veg) => (
                <div key={veg.id}>   
                <Link to={`/vegetable/${veg.id}`} className="veg-card clickable">
                  <Logo variant="icon" size="large" />
                  <Text size="medium" textAlign="center">{veg.name}</Text>
                </Link>  
                </div>
              ))}
            </div>
          )}
        </Flex>
        {selectedVegetables.length > 0 && (
        <Button
          onClick={resetVegSelect}
          type="button"
          label="Reset Veg Patch"
          variant="secondary"
        />
      )}


    </PageContainer>
    </div>
  );
}
