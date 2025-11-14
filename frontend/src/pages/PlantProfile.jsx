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
import Flex from "../components/Flexbox";
import Logo from "../components/Logo";

export default function PlantProfile() {
  console.log("Rendering PlantProfile component");
  const navigate = useNavigate();
  const { vegId } = useParams();
  const { user, token, loading } = useAuth();
  const [vegetable, setVegetable] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [fetching, setFetching] = useState(false);

  // ✅ Fetch vegetable only once auth is ready
  useEffect(() => {
    console.log("Loading:", loading);
    console.log("Token:", token);
    console.log("User:", user);

    if (loading) {
      console.log("From Plant profile - Auth still loading…");
      return;} // wait for auth
    if (!token) {
      console.log("From Plant Profile No token found. Redirecting to home.");
      setTimeout(() => {
        navigate("/");
      }, 6000); // 2-second delay
      return;
    }
    


    axios
      .get(`http://localhost:8000/vegetables/vegetable/${vegId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVegetable(res.data))
      .catch((err) => console.error("Error fetching vegetable details:", err))
      .finally(() => setFetching(false));
  }, [vegId, token, loading, navigate]);

  // ✅ Show loading / auth messages
  if (loading) return <Text size="medium">From PP Checking authentication...</Text>;
  if (!user || !token) return <Text size="medium">From PP Please log in</Text>;
  if (fetching || !vegetable) return <Text size="medium">From PPLoading vegetable details...</Text>;

  return (
    <PageContainer>

      <Container size="large">
        <Heading level={1} alignText="left">{vegetable.name}</Heading>

        <HeaderVegProfile
          buttons={["Overview", "Planting", "Growing", "Harvest"]}
          active={activeTab}
          onClick={setActiveTab}
        />

        {/* Overview */}
        {activeTab === "overview" && (
          <Container size="card">
            <Flex direction="column" gap="1rem" align="flex-start">
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">Sunlight: {vegetable.sunlight}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">Water: {vegetable.water}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small"  style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">Soil: {vegetable.soil}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }} />
            <Text size="medium" textAlign="left">Placement: {vegetable.placement}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }} />
            <Text size="medium" textAlign="left">Difficulty: {vegetable.difficulty}</Text>
            </Flex>
            </Flex>
            <Logo variant="icon" size="large" style={{ borderRadius: "50% 50% 0 0", position: "absolute", bottom: "-1rem", right: "2rem", zIndex: 10}} />
          </Container>
        )}

        {/* Planting */}
        {activeTab === "planting" && (
          <Container size="card">
            <Flex direction="column" gap="1rem" align="flex-start">
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">Sunlight: {vegetable.sunlight}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">Placement: {vegetable.placement}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small"  style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">Spacing Down: {vegetable.spacing_down}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }} />
            <Text size="medium" textAlign="left">Spacing Across {vegetable.spacing_across}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }} />
            <Text size="medium" textAlign="left">Spacing Between: {vegetable.spacing_between}</Text>
            </Flex>
            </Flex>
            <Logo variant="icon" size="large" style={{ borderRadius: "50% 50% 0 0", position: "absolute", bottom: "-1rem", right: "2rem", zIndex: 10}} />
          </Container>
        )}
        
        {/* Growing */}
        {activeTab === "growing" && (
          <Container size="card">
            <Flex direction="column" gap="1rem" align="flex-start">
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">Water: {vegetable.water}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">Fertiliser: {vegetable.fertiliser}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small"  style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">Care Tip 1: {vegetable.care_1}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }} />
            <Text size="medium" textAlign="left">Care Tip 2 {vegetable.care_2}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }} />
            <Text size="medium" textAlign="left">Care Tip 3 {vegetable.care_3}</Text>
            </Flex>
            </Flex>
            <Logo variant="icon" size="large" style={{ borderRadius: "50% 50% 0 0", position: "absolute", bottom: "-1rem", right: "2rem", zIndex: 10}} />
          </Container>
        )}

        {/* Harvest */}
        {activeTab === "harvest" && (
          <Container size="card">
            <Flex direction="column" gap="1rem" align="flex-start">
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">When: {vegetable.harvest}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">Harvest Signs: {vegetable.harvest_signs}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small"  style={{ border: "0.25px solid #adadad", borderRadius: "50%" }}/>
            <Text size="medium" textAlign="left">Sow: {vegetable.sow}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }} />
            <Text size="medium" textAlign="left">Plant: {vegetable.plant_hoe}</Text>
            </Flex>
            <Flex direction="row" gap="1rem" align="center">
            <Logo variant="icon" size="small" style={{ border: "0.25px solid #adadad", borderRadius: "50%" }} />
            <Text size="medium" textAlign="left">Other: {vegetable.water}</Text>
            </Flex>
            </Flex>
            <Logo variant="icon" size="large" style={{ borderRadius: "50% 50% 0 0", position: "absolute", bottom: "-1rem", right: "2rem", zIndex: 10}} />
          </Container>
        )}
      </Container>
      <Button onClick={() => navigate("/")} label="Home" variant="secondary" />
    </PageContainer>
  );
}
