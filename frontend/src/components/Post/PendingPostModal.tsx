import PostData from "../../models/PostData";
import Button from "../UI/Button";
import fullscreenIcon from "../../assets/fullscreen_icon.svg";
import { approveRejectPost } from "../../clients/backendApiClient";
import { useState } from "react";
import Modal from "../UI/Modal";
import ModifyPostModal from "./ModifyPostModal";
import { toShortDate } from "../../utils/DateConversion";
import "./PendingPostModal.scss";

interface PostDataProps {
  postData: PostData;
}

const PendingPostModal = ({ postData }: PostDataProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [modify, setModify] = useState<boolean>(false);

  const handleApprove = async () => {
    try {
      const result = await approveRejectPost(postData.id, 1);

      if (result) {
        window.location.reload();
      } else {
        setErrorMessage("Try again later");
      }
    } catch (error) {
      setErrorMessage("Try again later");
    }
  };

  const handleReject = async () => {
    try {
      const result = await approveRejectPost(postData.id, 2);

      if (result) {
        window.location.reload();
      } else {
        setErrorMessage("Try again later");
      }
    } catch (error) {
      setErrorMessage("Try again later");
    }
  };

  const openModifyModal = () => {
    setModify(true);
  };

  return (
    <>
      <div className="PendingPostModal">
        <div className="PendingPostModal__image__container">
          <img
            className="PendingPostModal__image"
            src={postData.imageUrl}
            alt={`image of ${postData.species.name}`}
          />
          <a href={postData.imageUrl} target="_blank">
            <img
              className="PendingPostModal__fullscreen"
              src={fullscreenIcon}
              alt="Show image fullscreen"
            />
          </a>
        </div>

        <div className="PendingPostModal__content">
          <div className="PendingPostModal__heading">
            <h3 className="PendingPostModal__heading__title">
              {postData.species.name}
            </h3>
            <p className="PendingPostModal__heading__bodyofwater">
              South Atlantic
            </p>
            <p className="PendingPostModal__heading__date">
              {toShortDate(postData.timestamp)}
            </p>
          </div>
          <p className="PendingPostModal__description">
            {postData.description}
          </p>
          <div className="PendingPostModal__user">
            <p className="PendingPostModal__text">{postData.user.name}</p>
            <div className="PendingPostModal__user__image-container">
              <img
                className="PendingPostModal__user__image"
                src="https://itsnotacareer.files.wordpress.com/2021/12/for-profile.jpg?w=816"
                alt={`${postData.user.name}'s profile picture`}
              />
            </div>
          </div>
          <div className="PendingPostModal__interactions">
            <div className="PendingPostModal__admin__tools">
              <Button
                className="Button__Approve"
                type="button"
                onClick={handleApprove}
              >
                Approve
              </Button>
              <Button
                className="Button__Modify"
                type="button"
                onClick={openModifyModal}
              >
                Modify
              </Button>
              <Button
                className="Button__Reject"
                type="button"
                onClick={handleReject}
              >
                Reject
              </Button>
            </div>
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
      {modify && (
        <Modal closeAction={() => setModify(false)}>
          <ModifyPostModal postData={postData} />
        </Modal>
      )}
    </>
  );
};

export default PendingPostModal;
