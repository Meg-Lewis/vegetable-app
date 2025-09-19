import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Container from "../components/Container";
import PageContainer from "../components/PageContainer";
import Flex from "../components/Flexbox";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Flexbox from "../components/Flexbox";
import Text from "../components/Text";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox or spam folder");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
    <PageContainer>
    <Container size="small">
    <Flex direction="column" gap="1rem" align="center" justify="center" fullHeight={true}>
    <Logo variant="icon" size="large" clickable={false} />
    <Heading level={1}>Reset Password</Heading>
    <Text size="small" textAlign="center" variant="muted">Enter your email address below to receive a password reset link.</Text>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <InputField
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Flexbox>
        <Button type="submit" label="Send reset email" />
        </Flexbox>
      </form>
      <div>
     <Text size="small" variant="muted">Remembered your password? <a href="/login">Login here</a>.</Text>
     <Text size="small" variant="muted">Don't have an account? Sign up <a href="/signup">here</a>.</Text>
     </div>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
        </Flex>
        </Container>
        </PageContainer>
    </div>
  );
}
