import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import PageContainer from "../components/PageContainer";
import Container from "../components/Container";
import Flex from "../components/Flexbox";
import Text from "../components/Text";
import Header from "../components/Header";
import { useSelectedVegetables } from "../context/SelectedVegetablesContext";
import Logo from "../components/Logo"; 
import axios from "axios";
import "../styles/VegetablePatch.css"; 
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext"

export default function VegetablePatch() {
  const { selectedVegetables, setSelectedVegetables } = useSelectedVegetables();
  const navigate = useNavigate();
  const { token } = useAuth();


  // Fetch vegetables ONCE when the page loads
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

  // Simple click handler — always navigate
  const handleClickVegetable = (vegId) => {
    navigate(`/${vegId}`);
  };

  return (
    <PageContainer>
      <Container size="large">
        <Flex direction="column" gap="2rem" align="center" justify="flex-start">
          <Header label="Your Veg Patch" />

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
                <div
                  key={veg.id}
                  className="veg-card clickable"
                  onClick={() => handleClickVegetable(veg.id)}
                >
                  <Logo variant="icon" size="large" />
                  <Text size="medium" textAlign="center">{veg.name}</Text>
                </div>
              ))}
            </div>
          )}
        </Flex>
      </Container>
    </PageContainer>
  );
}
