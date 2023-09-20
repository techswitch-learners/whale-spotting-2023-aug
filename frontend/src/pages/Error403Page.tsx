import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import "./Error403Page.scss";

const Error403Page = () => {
  const navigate = useNavigate();
  return (
    <section className="section-dark">
      <div className="container Error403__content">
        <h2>Forbidden Access</h2>
        <WhaleLoader
          isLoading={false}
          message="Can I tail you something... You are not meant to be here!"
        />
        <Button role="link" onClick={() => navigate("/")}>
          Take Me Home
        </Button>
      </div>
    </section>
  );
};

export default Error403Page;
