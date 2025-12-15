import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageContainer from "../components/PageContainer";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Text from "../components/Text";
import HeaderVegProfile from "../components/HeaderVegProfile";
import Flex from "../components/Flexbox";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { Sun, Droplet, Shovel, HouseHeart, Star, ArrowDownFromLine, ArrowRightFromLine, UnfoldHorizontal, SoapDispenserDroplet, Cross, CalendarCheck, ListCheck, Sprout, Flower2, Salad, Bean  } from "lucide-react";


export default function PlantProfile() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { vegId } = useParams();
  const [vegetable, setVegetable] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/vegetables/${vegId}`, {
       headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setVegetable(res.data))
      .catch(err => console.error(err));
  }, [vegId]);

  if (!vegetable) {
  return <Text size="medium">Loading vegetable details...</Text>;
  }


  return (
    <PageContainer>
      <Navbar/>

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
            <Flex direction="column" gap="1.5rem" align="flex-start" padding="1.5rem">
            <Flex direction="row" gap="1rem" align="center">
            <Sun size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Sunlight</Text>
            <Text className="text-bold" textAlign="left">{vegetable.sunlight}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <Droplet size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Water</Text>
            <Text className="text-bold" textAlign="left">{vegetable.water}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <Shovel size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Soil</Text>
            <Text className="text-bold" textAlign="left">{vegetable.soil}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <HouseHeart size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Placement</Text>
            <Text className="text-bold" textAlign="left">{vegetable.placement}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <Star size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Difficulty</Text>
            <Text className="text-bold" textAlign="left">{vegetable.difficulty}</Text>
            </Flex>
            </Flex>
            </Flex>
            <Logo variant="icon" size="large" style={{ borderRadius: "50% 50% 0 0", position: "absolute", bottom: "-1rem", right: "2rem", zIndex: 10}} />
          </Container>
        )}

        {/* Planting */}
        {activeTab === "planting" && (
          <Container size="card">
            <Flex direction="column" gap="1.5rem" align="flex-start" padding="1.5rem">
            <Flex direction="row" gap="1.5rem" align="center">
            <Sun size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Sunlight</Text>
            <Text className="text-bold" textAlign="left">{vegetable.sunlight}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <HouseHeart size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Placement</Text>
            <Text className="text-bold" textAlign="left">{vegetable.placement}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <ArrowDownFromLine size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Spacing Down</Text>
            <Text className="text-bold" textAlign="left">{vegetable.spacing_down}"</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <ArrowRightFromLine size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Spacing Across</Text>
            <Text className="text-bold" textAlign="left">{vegetable.spacing_across}"</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <UnfoldHorizontal size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Spacing Between</Text>
            <Text className="text-bold" textAlign="left">{vegetable.spacing_between}"</Text>
            </Flex>
            </Flex>
            </Flex>
            <Logo variant="icon" size="large" style={{ borderRadius: "50% 50% 0 0", position: "absolute", bottom: "-1rem", right: "2rem", zIndex: 10}} />
          </Container>
        )}
        
        {/* Growing */}
        {activeTab === "growing" && (
          <Container size="card">
            <Flex direction="column" gap="1.5rem" align="flex-start" padding="1.5rem">
            <Flex direction="row" gap="1rem" align="center">
            <Droplet size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Water</Text>
            <Text className="text-bold" textAlign="left">{vegetable.water}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <SoapDispenserDroplet size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start" wrap="wrap">
            <Text className="text-muted" size="small" textAlign="left">Fertiliser</Text>
            <Text className="text-bold" textAlign="left">{vegetable.fertiliser}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <Cross size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Care Tip</Text>
            <Text className="text-bold" textAlign="left">{vegetable.care_1}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <Cross size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Care Tip</Text>
            <Text className="text-bold" textAlign="left">{vegetable.care_2}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <Cross size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Care Tip</Text>
            <Text className="text-bold" textAlign="left">{vegetable.care_3}</Text>
            </Flex>
            </Flex>
            </Flex>
            <Logo variant="icon" size="large" style={{ borderRadius: "50% 50% 0 0", position: "absolute", bottom: "-1rem", right: "2rem", zIndex: 10}} />
          </Container>
        )}

        {/* Harvest */}
        {activeTab === "harvest" && (
          <Container size="card">
            <Flex direction="column" gap="1.5rem" align="flex-start" padding="1.5rem">
            <Flex direction="row" gap="1rem" align="center">
            <CalendarCheck size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Harvest</Text>
            <Text className="text-bold" textAlign="left">{vegetable.harvest}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <ListCheck size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Harvest Signs</Text>
            <Text className="text-bold" textAlign="left">{vegetable.harvest_signs}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <Bean size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Sow</Text>
            <Text className="text-bold" textAlign="left">{vegetable.sow}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <Sprout Salad  size={28} />
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Plant</Text>
            <Text className="text-bold" textAlign="left">{vegetable.plant_hoe}</Text>
            </Flex>
            </Flex>
            <Flex direction="row" gap="1.5rem" align="center">
            <Salad size={28} /> 
            <Flex direction="column" gap="0.1rem" align="flex-start">
            <Text className="text-muted" size="small" textAlign="left">Other</Text>
            <Text className="text-bold" textAlign="left">TBC</Text>
            </Flex>
            </Flex>
            </Flex>
            <Logo variant="icon" size="large" style={{ borderRadius: "50% 50% 0 0", position: "absolute", bottom: "-1rem", right: "2rem", zIndex: 10}} />
          </Container>
        )}
      </Container>
    </PageContainer>
  );
}
