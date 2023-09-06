import { BackendConnectionChecker } from "../components/BackendConnectionChecker";

export const Home = () => {
  return (
    <>
      <h1>Whale Spotting</h1>
      <BackendConnectionChecker />
    </>
  );
};

export default Home;
