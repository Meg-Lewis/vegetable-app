import Button from "../components/Button";
import Heading from "../components/Heading";
import Container from "../components/Container";
import Flex from "../components/Flexbox";
import PageContainer from "../components/PageContainer";
import Logo from "../components/Logo";

function WelcomePage() {
    return(
        <div>
        <PageContainer>
        <Container size="small">
            <Flex direction="column" gap="1rem" align="center" justify="center" fullHeight={true}>
            <Logo variant="icon" size="xlarge" clickable={false} />
            <Heading level={1}>Get Started On Your Journey Today!</Heading>
            <Flex gap="1rem" justify="center">
            <Button label="Log In" variant="primary" onClick={() => alert("Log In Clicked!")} />
            <Button label="Sign Up" variant="secondary" onClick={() => alert("Sign Up Clicked!")} />
            </Flex>
            </Flex>
        </Container>
        </PageContainer>
        </div>
    )
}
export default WelcomePage;