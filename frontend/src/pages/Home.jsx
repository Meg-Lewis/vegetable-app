import Button from "../components/Button";
import Heading from "../components/Heading";
import Text from "../components/Text";
import Container from "../components/Container";

function Home() {
  return (
    <div>
    <Container size="small">
    <Heading level={1}>Homepage</Heading>
    <Heading level={2}>Welcome to VegAble</Heading>
    <Heading level={3}>Your smart green planner</Heading>
      <Text size="small" variant="muted">
        Track sowing, planting, and harvesting with ease
      </Text>
    <Button label="Save" variant="primary" onClick={() => alert("Saved!")} />
    <Button label="Cancel" variant="secondary" onClick={() => alert("Cancelled!")} />
    </Container>
  </div>
)
}

export default Home;
