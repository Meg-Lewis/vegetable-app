import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "../components/PageContainer";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Text from "../components/Text";
import { useAuth } from "../context/AuthContext";
import HeaderVegProfile from "../components/HeaderVegProfile"; 
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function PlantProfile() {
  const navigate = useNavigate();
  const { vegId } = useParams();
  const { token } = useAuth();
  const [vegetable, setVegetable] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/vegetables/vegetable/${vegId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVegetable(res.data))
      .catch((err) => console.error("Error fetching vegetable details:", err));
  }, [vegId, token]);

  if (!vegetable) {
    return <Text size="medium">Loading vegetable details...</Text>;
  }

  return (
    <PageContainer>
      <Button onClick ={() => navigate("/")} label="Home" variant="secondary" />
  
      <Container size="medium">
        <Heading level={1}>{vegetable.name}</Heading>

        {/* Section Tabs */}
        <HeaderVegProfile
          buttons={["Overview", "Planting", "Growing", "Harvest"]}
          active={activeTab}
          onClick={setActiveTab}
        />

        {/* Section Content */}
        {activeTab === "overview" && (
          <div>
            <Text size="medium">Difficulty: {vegetable.difficulty}</Text>
            <Text size="medium">Sunlight: {vegetable.sunlight}</Text>
            <Text size="medium">Soil: {vegetable.soil}</Text>
            <Text size="medium">Water: {vegetable.water}</Text>

          </div>
        )}
        {activeTab === "planting" && (
          <div>
            <Text size="medium">Planting tips</Text>

          </div>
        )}
        {activeTab === "growing" && (
          <div>
            <Text size="medium">Growing tips</Text>
            {/* Add any additional growing info here */}
          </div>
        )}
        {activeTab === "harvest" && (
          <div>
            <Text size="medium">Harvest tips</Text>
            {/* Add any harvest info here */}
          </div>
        )}
      </Container>
    </PageContainer>
  );
}
