import Button from "../components/Button";
import Heading from "../components/Heading";
import Container from "../components/Container";
import Flex from "../components/Flexbox";
import PageContainer from "../components/PageContainer";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

function GetStarted() {

    return(
        <div>
        <PageContainer>
        <Container size="medium">
            <Flex direction="column" gap="1rem" align="center" justify="center" fullHeight={true}>
            <Logo variant="icon" size="xlarge" clickable={false} />
            <Heading level={1}>Let's Get Started!</Heading>
            <Flex gap="1rem" justify="center">
            <Link to="/login">
            <Button label="Let's Go" variant="primary" />
            </Link>
            </Flex>
            </Flex>
        </Container>
        </PageContainer>
        </div>
    )
}
export default GetStarted;