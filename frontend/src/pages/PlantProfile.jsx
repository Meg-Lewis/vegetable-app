import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "../components/PageContainer";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Text from "../components/Text";


export default function PlantProfile() {
  const { vegetableId } = useParams();
  const [vegetable, setVegetable] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/vegetables/${vegetableId}`)
      .then((res) => setVegetable(res.data))
      .catch((err) => console.error("Error fetching vegetable details:", err));
  }, [vegetableId]);

  if (!vegetable) {
    return <Text size="medium">Loading vegetable details...</Text>;
  }

  return (
    <PageContainer>
      <Container size="medium">
        <Heading level={1}>{vegetable.name}</Heading>
        <Text size="medium">Difficulty: {vegetable.difficulty}</Text>
        <Text size="medium">Sunlight: {vegetable.sunlight}</Text>
        <Text size="medium">Water: {vegetable.water}</Text>
        <Text size="medium">Soil: {vegetable.soil}</Text>
        <Text size="medium">Description: {vegetable.description}</Text>
      </Container>
    </PageContainer>
  );
}
