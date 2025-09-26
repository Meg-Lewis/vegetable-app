import React from "react";
import PageContainer from "../components/PageContainer";
import Container from "../components/Container";
import Flex from "../components/Flexbox";
import Text from "../components/Text";
import Header from "../components/Header";
import { useSelectedVegetables } from "../context/SelectedVegetablesContext";
import Logo from "../components/Logo"; 
import "../styles/VegetablePatch.css"; 

export default function VegetablePatch() {
  const { selectedVegetables } = useSelectedVegetables();

  return (
    <PageContainer>
      <Container size="large">
        <Flex direction="column" gap="2rem" align="center" justify="flex-start">
          <Header label="Your Veg Patch" />

          {selectedVegetables.length === 0 ? (
            <Text size="medium">No vegetables selected yet.</Text>
          ) : (
            <div className="veg-grid">
              {selectedVegetables.map((veg) => (
                <div key={veg.id} className="veg-card">
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
