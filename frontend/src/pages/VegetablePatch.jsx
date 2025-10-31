import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 for navigation
import PageContainer from "../components/PageContainer";
import Container from "../components/Container";
import Flex from "../components/Flexbox";
import Text from "../components/Text";
import Header from "../components/Header";
import { useSelectedVegetables } from "../context/SelectedVegetablesContext";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo"; 
import axios from "axios";
import "../styles/VegetablePatch.css"; 
import Button from "../components/Button";


export default function VegetablePatch() {

  const { selectedVegetables, setSelectedVegetables } = useSelectedVegetables();
  const { token } = useAuth(); // Firebase token
  const navigate = useNavigate();

  // Fetch saved vegetables on mount
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/vegetables/user", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setSelectedVegetables(response.data))
      .catch((error) => console.error("Failed to load saved vegetables:", error));
  }, [token, setSelectedVegetables]);



  return (
    <PageContainer>
      <Container size="large">
        <Flex direction="column" gap="2rem" align="center" justify="flex-start">
          <Header label="Your Veg Patch" />

          {selectedVegetables.length === 0 ? (
            <div>
            <Text size="medium">No vegetables selected yet.</Text>
            <Button onClick ={() => navigate("/veg-select")} label="Select Vegetables" variant="secondary" />
            </div> ) : (
            <div className="veg-grid">
              {selectedVegetables.map((veg) => (
                <div
                  key={veg.id}
                  className="veg-card clickable" 
                  onClick={() => navigate(`/vegetable/${veg.id}`)}
                >
                  <Logo variant="icon" size="large" /> {/* placeholder image */}
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
