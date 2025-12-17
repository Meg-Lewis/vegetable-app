import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Container from "../components/Container";
import PageContainer from "../components/PageContainer";
import Flex from "../components/Flexbox";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Flexbox from "../components/Flexbox";
import Text from "../components/Text";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update displayName with name field
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      console.log("User signed up:", userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <PageContainer>
      <Flex direction="column" gap="1rem" align="center" justify="center">
      <Logo variant="icon" size="large" clickable={false} />
      <Heading level={1}>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{ marginBottom: "1rem" }}
      />
        
         <InputField
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={{ marginBottom: "1rem" }}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
      />
      <InputField
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={handleChange}
        style={{ marginBottom: "2rem" }}
      />
      <Flexbox>
      <Button type="submit"  label="Submit" variant="primary" />
      </Flexbox>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Text size="small" variant="muted">Already have an account? Log in <a href="/login">here</a>.</Text>
      </Flex>
      </PageContainer>
    </div>
  );
}
