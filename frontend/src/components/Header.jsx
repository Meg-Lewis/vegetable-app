import React from "react";
import Button from "./Button";
import Heading from "./Heading";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import Flex from "./Flexbox";

export default function Header({ label }) { // receive label as a prop
  const navigate = useNavigate();

  return (
    <div>
      <Container size="small">
        <Heading level={1} alignText="center">{label}</Heading>
        <Flex direction="row" gap="1rem" align="center" justify="center">
          <Button label="Year" variant="primary" onClick={() => navigate("/")} />
          <Button label="Seasons" variant="primary" onClick={() => navigate("/")} />
          <Button label="Vegetables" variant="primary" onClick={() => navigate("/vegetablepatch")} />
        </Flex>
      </Container>
    </div>
  );
}
