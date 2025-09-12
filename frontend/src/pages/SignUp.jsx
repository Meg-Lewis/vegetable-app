import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Container from "../components/Container";

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
      <Container size="small">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
         <InputField
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit"  label="Submit" variant="primary" onClick={() => alert("Thank you for signing up!")} />

      </form>
      <p>{message}</p>
      </Container>
    </div>
  );
}
