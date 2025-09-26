import Button from "../components/Button";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import Flex from "../components/Flexbox";

export default function VegetablePatch() {
  return (
      <div>
      <Container size="small">
      <Heading level={1} alignText="center">Your Veg Patch</Heading>
      <Flex direction="row" gap="1rem" align="center" justify="center">
      <Button label="Year" variant="primary" onClick={() => navigate("/")} />
      <Button label="Seasons" variant="primary" onClick={() => navigate("/")} />
      <Button label="Vegetables" variant="primary" onClick={() => navigate("/veg-patch")}/>
      </Flex>
      

      <div>

      </div>
      </Container>
    </div>
  );
}