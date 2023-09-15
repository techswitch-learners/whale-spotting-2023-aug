import EventData from "../../models/EventData";
import { toShortDate } from "../../utils/DateConversion";
import fullscreenIcon from "../../assets/fullscreen_icon.svg";
import ShareButton from "../ShareButtons";
import "./CardEventModal.scss";
import Button from "../UI/Button";

interface EventDataProps {
  eventData: EventData;
}

const CardEventModal = ({ eventData }: EventDataProps) => {
  return (
    <div className="CardEventModal">
      <div className="CardEventModal__image__container">
        <img
          className="CardEventModal__image"
          src={eventData.eventImageUrl}
          alt={`image of event ${eventData.id}`}
        />
        <a href={eventData.eventImageUrl} target="_blank">
          <img
            className="CardEventModal__fullscreen"
            src={fullscreenIcon}
            alt="Show image fullscreen"
          />
        </a>
      </div>

      <div className="CardEventModal__content">
        <div className="CardEventModal__heading">
          <h3 className="CardEventModal__heading__title">
            {eventData.location}
          </h3>
          <p className="CardEventModal__heading__date">
            {toShortDate(eventData.startDate)}
          </p>
          <p className="CardEventModal__heading__duration">
            Duration: {eventData.duration} days
          </p>
        </div>
        <Button
          className="CardEventModal__button"
          onClick={() => {
            window.open(`${eventData.eventLink}`, "_blank");
          }}
        >
          Click here view event website <br /> (external link)
        </Button>
        <ShareButton url={eventData.eventLink} size={48} />
      </div>
    </div>
  );
};

export default CardEventModal;
