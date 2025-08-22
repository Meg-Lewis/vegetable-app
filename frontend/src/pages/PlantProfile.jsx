import { useParams } from 'react-router-dom';

export default function PlantProfile() {
  const { id } = useParams();
  return <h1>Plant Profile {id}</h1>;
}
