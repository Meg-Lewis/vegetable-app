import React from "react";
import Button from "./Button";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";
import Flex from "./Flexbox";

export default function Header({ label }) { // receive label as a prop
  const navigate = useNavigate();

  return (
    <div>

        <Heading level={1} alignText="left">{label}</Heading>
        <Flex direction="row" gap="1rem" align="center" justify="center">
          <Button label="Year" variant="primary" onClick={() => navigate("/year-overview")} />
          <Button label="Seasons" variant="primary" onClick={() => navigate("/seasons")} />
          <Button label="Vegetables" variant="primary" onClick={() => navigate("/vegetablepatch")} />
        </Flex>

    </div>
  );
}
