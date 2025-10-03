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
import { useAuth } from "../context/AuthContext";

export default function VegSelect() {
  const navigate = useNavigate();
  const { selectedVegetables, toggleVegetable, setSelectedVegetables } = useSelectedVegetables();
  const { user, token } = useAuth();

  const [allVegetables, setAllVegetables] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all vegetables from the database
  useEffect(() => {
    if (!token) return; // wait for user to be logged in

    axios
      .get("http://127.0.0.1:8000/vegetables/all", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setAllVegetables(response.data))
      .catch((error) => console.error("Failed to fetch vegetables:", error));
  }, [token]);

  // Optional: pre-fill selectedVegetables if user already has saved vegetables
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/vegetables/user", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setSelectedVegetables(response.data))
      .catch((error) => console.error("Failed to load user selections:", error));
  }, [token, setSelectedVegetables]);

  const filteredVegetables = allVegetables.filter((veg) =>
    typeof searchQuery === "string" && veg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelected = (vegetable) => selectedVegetables.some((v) => v.id === vegetable.id);

  const handleNextClick = async () => {
    if (!token) {
      alert("Please log in to save your selected vegetables.");
      return;
    }

    if (selectedVegetables.length === 0) {
      alert("No vegetables selected to save.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/vegetables/select",
        selectedVegetables.map((veg) => ({ name: veg.name, difficulty: veg.difficulty })),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/vegetablepatch");
    } catch (error) {
      console.error("Error saving selected vegetables:", error);
      alert("Failed to save your selected vegetables. Please try again.");
    }
  };

  return (
    <PageContainer>
      <Container size="small">
        <Flex direction="column" gap="1rem" align="center" justify="center" fullHeight={true}>
          <Heading level={1} alignText="left">Select Your Vegetables</Heading>

          <InputField
            type="text"
            placeholder="Search vegetables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="scroll-container">
            <UnorderedList className="unordered-list">
              {filteredVegetables.map((veg) => (
                <li
                  key={veg.id}
                  className={`list-item ${isSelected(veg) ? "selected" : ""}`}
                  onClick={() => toggleVegetable(veg)}
                >
                  <Flex justify="space-between" align="center">
                    <Text size="medium">{veg.name}</Text>
                    <Tag difficulty={veg.difficulty} label={veg.difficulty} type={veg.difficulty} />
                  </Flex>
                </li>
              ))}
            </UnorderedList>
          </div>

          <Button variant="primary" label="Next" onClick={handleNextClick} />
        </Flex>
      </Container>
    </PageContainer>
  );
}
