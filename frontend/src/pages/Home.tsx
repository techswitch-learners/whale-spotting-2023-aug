import { BackendConnectionChecker } from "../components/BackendConnectionChecker";
import logo from "/logo.png";

export const Home = () => {
  return (
    <>
      <img
        src={logo}
        alt="The logo of the site: a cartoon whale, looking through a pair of binoculars."
        width="200"
      />
      <h1>Whale Spotting</h1>
      <BackendConnectionChecker />
    </>
  );
};

export default Home;
