import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
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
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();

  // Fetch saved vegetables on mount
  useEffect(() => {
    if (loading) return <Text size="medium">Checking authentication...</Text>;
    if (!user) return <Text size="medium">Please log in</Text>;

    axios
      .get("http://127.0.0.1:8000/vegetables/user", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setSelectedVegetables(response.data))
      .catch((error) => console.error("Failed to load saved vegetables:", error));
  }, [token, setSelectedVegetables]);

  // Navigate only if token exists
  const handleClickVegetable = (vegId) => {
    if (!token) {
      console.warn("Token not ready. Cannot navigate yet.");
      return;
    }
    navigate(`/vegetable/${vegId}`);
  };



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
