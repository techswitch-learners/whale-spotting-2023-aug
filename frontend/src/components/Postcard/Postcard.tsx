import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import firstClassStamp from "../../assets/Stamp_1st_Class.png";
import secondClassStamp from "../../assets/Stamp_2nd_Class.png";
import { ChangeEvent, useEffect, useState, useContext } from "react";
import { Margin, usePDF } from "react-to-pdf";
import Button from "../UI/Button";
import useScreenSize from "../../utils/UseScreensize";
import { LoginContext } from "../../context/LoginManager";
import "./Postcard.scss";

interface PostDataProps {
  postData: PostData;
}

interface PostCardForm {
  from: string;
  to: string;
  message: string;
}

const stamps = [firstClassStamp, secondClassStamp];

const Postcard = ({ postData }: PostDataProps) => {
  const [random, setRandom] = useState(Math.round(Math.random()));
  const [stamp, setStamp] = useState(stamps[random]);
  const [form, setForm] = useState<PostCardForm>({
    from: "",
    to: "",
    message: "",
  });
  const [orientation, setOrientation] = useState<
    "portrait" | "landscape" | "p" | "l"
  >("landscape");
  const screenSize = useScreenSize();
  const loginContext = useContext(LoginContext);

  const { toPDF, targetRef } = usePDF({
    filename: "whale-spotting-2023-july-postcard.pdf",
    page: {
      margin: Margin.SMALL,
      format: "A4",
      orientation: `${orientation}`,
    },
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
    },
  });

  const formHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const downloadPostcard = () => {
    toPDF();
    console.log("Postcard Downloaded!");
  };

  useEffect(() => {
    setStamp(stamps[random]);
  }, [random]);

  useEffect(() => {
    screenSize.height / screenSize.width >= 1
      ? setOrientation("portrait")
      : setOrientation("landscape");
  }, [screenSize]);

  useEffect(() => {
    if (loginContext.encodedAuth) {
      const currentUsername = atob(
        loginContext.encodedAuth.slice("Basic ".length),
      ).split(":")[0];
      setForm((prevState) => ({
        ...prevState,
        from: currentUsername,
      }));
    }
  }, [loginContext.encodedAuth]);

  return (
    <>
      <div ref={targetRef}>
        <div className="PostcardBorder">
          <div className="PostcardContainer">
            <img
              className="PostcardContainer__stamp"
              src={stamp}
              onClick={() => setRandom(random == 1 ? 0 : 1)}
            />
            <div className="PostcardContainer__imagecontainer">
              <img
                className="PostcardContainer__imagecontainer__image"
                src={postData.imageUrl}
                alt={`image of ${postData.species.name}`}
              />
              <div className="PostcardContainer__heading">
                <h3 className="PostcardContainer__heading__title">
                  {postData.species.name}
                </h3>
                <p className="PostcardContainer__heading__bodyofwater">
                  {postData.bodyOfWater &&
                    `${postData.bodyOfWater.name} - ${" "}`}
                  {toShortDate(postData.creationTimestamp)}
                </p>
              </div>
            </div>
            <div className="PostcardContainer__content">
              <div className="PostcardContainer__content__form">
                <label
                  htmlFor="to"
                  className="PostcardContainer__content__form__label"
                >
                  TO:
                  <input
                    className="PostcardContainer__content__form__input towidth"
                    type="text"
                    name="to"
                    value={form.to}
                    onChange={formHandler}
                  />
                </label>
                <label htmlFor="message">
                  <textarea
                    rows={6}
                    cols={10}
                    className="PostcardContainer__content__form__textarea "
                    name="message"
                    value={form.message}
                    onChange={formHandler}
                  />
                </label>
                <label htmlFor="from" className="from">
                  FROM:
                  <input
                    className="PostcardContainer__content__form__input"
                    type="text"
                    name="from"
                    value={form.from}
                    onChange={formHandler}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="PostcardDownload">
        <Button onClick={downloadPostcard}>Download</Button>
      </div>
    </>
  );
};

export default Postcard;
