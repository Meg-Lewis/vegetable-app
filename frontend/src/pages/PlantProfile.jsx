import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PageContainer from "../components/PageContainer";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Text from "../components/Text";
import HeaderVegProfile from "../components/HeaderVegProfile";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function PlantProfile() {
  const navigate = useNavigate();
  const { vegId } = useParams();
  const { user, token, loading } = useAuth();
  const [vegetable, setVegetable] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // 1️⃣ Wait until auth is ready before fetching
  useEffect(() => {
    if (loading) return; // wait for auth context
    if (!token) {
      console.warn("No token found. Redirecting to home.");
      navigate("/");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/vegetables/vegetable/${vegId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVegetable(res.data))
      .catch((err) => console.error("Error fetching vegetable details:", err));
  }, [vegId, token, loading, navigate]);

  // 2️⃣ Show meaningful UI during auth initialisation
  if (loading) return <Text size="medium">Checking authentication...</Text>;
  if (!user) return <Text size="medium">Please log in</Text>;
  if (!vegetable) return <Text size="medium">Loading vegetable details...</Text>;

  return (
    <PageContainer>
      <Button onClick={() => navigate("/")} label="Home" variant="secondary" />

      <Container size="medium">
        <Heading level={1}>{vegetable.name}</Heading>

        <HeaderVegProfile
          buttons={["Overview", "Planting", "Growing", "Harvest"]}
          active={activeTab}
          onClick={setActiveTab}
        />

        {activeTab === "overview" && (
          <div>
            <Text size="medium">Difficulty: {vegetable.difficulty}</Text>
            <Text size="medium">Sunlight: {vegetable.sunlight}</Text>
            <Text size="medium">Soil: {vegetable.soil}</Text>
            <Text size="medium">Water: {vegetable.water}</Text>
          </div>
        )}
      </Container>
    </PageContainer>
  );
}
