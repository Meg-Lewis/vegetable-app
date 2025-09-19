import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Container from "../components/Container";
import PageContainer from "../components/PageContainer";
import Flex from "../components/Flexbox";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Flexbox from "../components/Flexbox";
import Text from "../components/Text";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <PageContainer>
      <Container size="small">
      <Flex direction="column" gap="1rem" align="center" justify="center" fullHeight={true}>
      <Logo variant="icon" size="large" clickable={false} />
      <Heading level={1}>Login</Heading>

        <form onSubmit={handleLogin}>
          <InputField type = "email" placeholder = "Email" value = {email} onChange = {(e) => setEmail(e.target.value)} required />
          <InputField type = "password" placeholder = "Password" value = {password} onChange = {(e) => setPassword(e.target.value)} required />
          <Flexbox gap="1rem" justify="center" marginTop="1rem">
          <Button label="Login" variant="primary" type="submit" />
          </Flexbox>
        </form>
        <p>{message}</p>
        <Text size="small" variant="muted">Don't have an account? Sign up <a href="/signup">here</a>.</Text>
      </Flex>
      </Container>
      </PageContainer>
    </div>
  );
}
