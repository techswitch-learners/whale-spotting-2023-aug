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
          src={eventData.imageUrl}
          alt={`image of event ${eventData.id}`}
        />
        <a href={eventData.imageUrl} target="_blank">
          <img
            className="CardEventModal__fullscreen"
            src={fullscreenIcon}
            alt="Show image fullscreen"
          />
        </a>
      </div>

      <div className="CardEventModal__content">
        <div className="CardEventModal__heading">
          <h3 className="CardEventModal__heading__title">{eventData.name}</h3>
          <p className="CardEventModal__heading__date">
            {toShortDate(eventData.startDate)}
          </p>
          <p className="CardEventModal__heading__location">
            @ {eventData.location}
          </p>
          <p className="CardEventModal__heading__duration">
            Duration: {eventData.durationInHours} hours
          </p>
        </div>
        <Button
          className="CardEventModal__button"
          onClick={() => {
            window.open(`${eventData.link}`, "_blank");
          }}
        >
          Click here view event website <br /> (external link)
        </Button>
        <ShareButton url={eventData.link} size={48} type={"Spotting event"} />
      </div>
    </div>
  );
};

export default CardEventModal;
