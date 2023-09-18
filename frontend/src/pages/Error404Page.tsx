import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import "./Error404Page.scss";

const Error404Page = () => {
  const navigate = useNavigate();
  return (
    <section className="section-dark">
      <div className="container Error404__content">
        <h2>Page Not Found</h2>
        <WhaleLoader
          isLoading={false}
          message="The open ocean is a dangerous place... Let me give you a lift back to safety"
        />
        <Button role="link" onClick={() => navigate("/")}>
          Take Me Home
        </Button>
      </div>
    </section>
  );
};

export default Error404Page;
