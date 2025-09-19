import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Container from "../components/Container";
import PageContainer from "../components/PageContainer";
import Flex from "../components/Flexbox";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Flexbox from "../components/Flexbox";
import Text from "../components/Text";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Signup successful!");
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
              <Heading level={1}>Sign Up</Heading>
      <form onSubmit={handleSignup}>
                 <InputField
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
        
         <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Confirm password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Flexbox>
      <Button type="submit"  label="Submit" variant="primary" onClick={() => alert("Thank you for signing up!")} />
      </Flexbox>
      </form>
      <p>{message}</p>
      <Text size="small" variant="muted">Already have an account? Log in <a href="/login">here</a>.</Text>
      </Flex>
      </Container>
      </PageContainer>
    </div>
  );
}
