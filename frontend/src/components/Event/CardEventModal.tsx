import EventData from "../../models/EventData";
import { toShortDate } from "../../utils/DateConversion";
import shareIcon from "../../assets/share_icon.png";
import fullscreenIcon from "../../assets/fullscreen_icon.svg";

import "./CardEventModal.scss";

interface EventDataProps {
  eventData: EventData;
}

const CardEventModal = ({ eventData }: EventDataProps) => {
  return (
    <div className="CardPostModal">
      <div className="CardPostModal__image__container">
        <img
          className="CardPostModal__image"
          src={eventData.eventImageUrl}
          alt={`image of event ${eventData.id}`}
        />
        <a href={eventData.eventImageUrl} target="_blank">
          <img
            className="CardPostModal__fullscreen"
            src={fullscreenIcon}
            alt="Show image fullscreen"
          />
        </a>
      </div>

      <div className="CardPostModal__content">
        <div className="CardPostModal__heading">
          <h3 className="CardPostModal__heading__title">
            {eventData.location}
          </h3>
          <p className="CardPostModal__heading__date">
            {eventData.startDate.toString()}
          </p>
          <p className="CardPostModal__heading__duration">
            Duration: {toShortDate(eventData.startDate)} days
          </p>
        </div>
        <p className="CardPostModal__description">
          <a href={eventData.eventLink}>{eventData.eventLink}</a>
        </p>
        <div className="CardPostModal__interactions">
          <div>
            <img src={shareIcon} alt="share event" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEventModal;
