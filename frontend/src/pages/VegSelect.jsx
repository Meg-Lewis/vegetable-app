import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";
import PageContainer from "../components/PageContainer";
import Flex from "../components/Flexbox";
import Heading from "../components/Heading";
import Text from "../components/Text";
import UnorderedList from "../components/UnorderedList";
import Tag from "../components/Tag";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "../styles/listItem.css";
import "../styles/ScrollContainer.css";
import "../styles/Tag.css";
import { useNavigate } from "react-router-dom";
import { useSelectedVegetables } from "../context/SelectedVegetablesContext";

export default function VegSelect() {
  const navigate = useNavigate();
  const [vegetables, setVegetables] = useState([]);
  const [search, setSearch] = useState("");
  const { selectedVegetables, toggleVegetable } = useSelectedVegetables();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/vegetables")
      .then((res) => setVegetables(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredVegetables = vegetables.filter((veg) =>
    veg.name.toLowerCase().includes(search.toLowerCase())
  );

  const isSelected = (veg) =>
    selectedVegetables.some((v) => v.id === veg.id);

  return (
    <PageContainer>
      <Container size="small">
        <Flex direction="column" gap="1rem" align="center" justify="center" fullHeight={true}>
          <Heading level={1} alignText="left">
            Select Your Vegetables
          </Heading>

          <InputField
            type="text"
            placeholder="Search vegetables..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />

          <div className="scroll-container">
            <UnorderedList className="unordered-list">
              {filteredVegetables.map((veg) => (
                <li
                  key={veg.id}
                  className={`list-item ${isSelected(veg) ? "selected" : ""}`}
                  onClick={() => toggleVegetable(veg)}
                >
                  <Flex justify="space-between" align="center" fullWidth={true}>
                    <Text size="medium" textAlign="left">{veg.name}</Text>
                    <Tag difficulty={veg.difficulty} label={veg.difficulty} type={veg.difficulty} />
                  </Flex>
                </li>
              ))}
            </UnorderedList>
          </div>

          <Button variant="primary" label="Next" onClick={() => navigate("/")} />
        </Flex>
      </Container>
    </PageContainer>
  );
}




