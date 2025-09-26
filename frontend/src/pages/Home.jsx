import Button from "../components/Button";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Homepage() {
  const navigate = useNavigate();

    return (
      <div>
      <Header label="Homepage" />
    </div>
  )

}
