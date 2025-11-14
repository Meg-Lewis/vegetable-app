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

  // Fetch saved vegetables once auth is ready
  useEffect(() => {
    console.log("Loading:", loading);
    console.log("Token:", token);
    console.log("User:", user);

    if (loading) {
      console.log("Auth still loading…");
      return;
    } // wait until auth initialises
    if (!token) {
      console.log("No token found. Redirecting to home.");
    setTimeout(() => {
      navigate("/");
    }, 6000); // 2-second delay
    return;
  }

    axios
      .get("http://localhost:8000/vegetables/user", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setSelectedVegetables(response.data))
      .catch((error) => console.error("Failed to load saved vegetables:", error));
  }, [token, loading, setSelectedVegetables, navigate]);

  // Click handler — only navigate if auth is ready
  const handleClickVegetable = (vegId) => {
    if (loading) {
      console.log("Auth still loading…");
      return;
    }

    if (!token) {
      console.log("No token available – redirecting to home.");
      navigate("/");
      return;
    }

    // ✅ Navigate after confirming token
    console.log("Navigating to vegetable:", vegId);
    navigate(`/vegetable/${vegId}`);
  };

  // Show loading / auth messages
  if (loading) return <Text size="medium">Checking authentication...</Text>;
  if (!user || !token) return <Text size="medium">Please log in</Text>;

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
