import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";
import PageContainer from "../components/PageContainer";
import Flex from "../components/Flexbox";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Flexbox from "../components/Flexbox";
import Text from "../components/Text";
import UnorderedList from "../components/UnorderedList";

export default function VegSelect() {
    
  const [vegetables, setVegetables] = useState([]);
  const [selected, setSelected] = useState({}); // { vegetableId: true/false }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/vegetables")
      .then(res => setVegetables(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PageContainer>
      <Container size="small">
        <Flex direction="column" gap="1rem" align="center" justify="center" fullHeight={true}>
          <Heading level={1} alignText="left">Select Your Vegetables</Heading>

          <UnorderedList>
            {vegetables.map(veg => (
              <li key={veg.id} className="unordered-list-item">
                <label>
                  <Flex justify="space-between" gap="1rem">
                    <Text size="medium" textAlign="left">{veg.name}</Text>
                    <Text size="medium">{veg.difficulty}</Text>
                    <input 
                      type="checkbox" 
                      checked={!!selected[veg.id]} 
                      onChange={() => handleSelect(veg.id)} 
                    />
                  </Flex>
                </label>
              </li>
            ))}
          </UnorderedList>

          {/* Debugging output */}
          <pre>{JSON.stringify(selected, null, 2)}</pre>
        </Flex>
      </Container>
    </PageContainer>
  );
}
