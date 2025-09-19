import Button from "../components/Button";
import Heading from "../components/Heading";
import Container from "../components/Container";
import Flex from "../components/Flexbox";
import PageContainer from "../components/PageContainer";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

function WelcomePage() {

    return(
        <div>
        <PageContainer>
        <Container size="small">
            <Flex direction="column" gap="1rem" align="center" justify="center" fullHeight={true}>
            <Logo variant="icon" size="xlarge" clickable={false} />
            <Heading level={1}>Get Started On Your Journey Today!</Heading>
            <Flex gap="1rem" justify="center">
            <Link to="/login">
            <Button label="Log In" variant="primary" />
            </Link>
            <Link to="/signup">
            <Button label="Sign Up" variant="secondary" />
            </Link>
            </Flex>
            </Flex>
        </Container>
        </PageContainer>
        </div>
    )
}
export default WelcomePage;