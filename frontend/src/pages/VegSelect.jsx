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

export default function VegSelect() {
  const navigate = useNavigate();
  const [vegetables, setVegetables] = useState([]);
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/vegetables")
      .then((res) => setVegetables(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredVegetables = vegetables.filter((veg) =>
    veg.name.toLowerCase().includes(search.toLowerCase())
  );



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

          {/* Scrollable container around the list */}
          <div className="scroll-container">
            <UnorderedList className="unordered-list">
              {filteredVegetables.map((veg) => (
                <li
                  key={veg.id}
                  className={`list-item ${selected[veg.id] ? "selected" : ""}`}
                  onClick={() => handleSelect(veg.id)}
                >
                  <Flex justify="space-between" align="center" fullWidth={true}>
                    <Text size="medium" textAlign="left">
                      {veg.name}
                    </Text>
                    <Tag difficulty={veg.difficulty} label={veg.difficulty} type={veg.difficulty} />
                  </Flex>
                </li>
              ))}
            </UnorderedList>
          </div>

          {/* <pre>{JSON.stringify(selected, null, 2)}</pre> For debugging*/}
          <Button variant="primary" label="Next" onClick={() => navigate("/")}></Button>
        </Flex>
        
      </Container>
    </PageContainer>
  );
}




