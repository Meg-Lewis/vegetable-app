import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";
import PageContainer from "../components/PageContainer";
import Flex from "../components/Flexbox";
import Heading from "../components/Heading";
import Text from "../components/Text";
import UnorderedList from "../components/UnorderedList";
import Tag from "../components/Tag";
import Button from "../components/Button";
import "../styles/listItem.css"; 

export default function VegSelect() {
  const [vegetables, setVegetables] = useState([]);
  const [selected, setSelected] = useState({}); // { vegId: true/false }

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/vegetables")
      .then((res) => setVegetables(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PageContainer>
      <Container size="small">
        <Flex direction="column" gap="1rem" align="center" justify="center" fullHeight={true}>
          <Heading level={1} alignText="left">
            Select Your Vegetables
          </Heading>

          <UnorderedList className="unordered-list">
            {vegetables.map((veg) => (
              <li
                key={veg.id}
                className={`list-item ${selected[veg.id] ? "selected" : ""}`}
                onClick={() => handleSelect(veg.id)}
              >
                <Flex justify="space-between" align="center" fullWidth={true}>
                  <Text size="medium" textAlign="left">
                    {veg.name}
                  </Text>
                  <Tag label={veg.difficulty} type={veg.difficulty} />
                </Flex>
              </li>
            ))}
          </UnorderedList>

          {/*<pre>{JSON.stringify(selected, null, 2)}</pre>  Debugging */}
        </Flex>
        <Button type="submit" label="Next" variant="primary" />
      </Container>
    </PageContainer>
  );
}
