import EventData from "../../models/EventData";
import { toShortDate } from "../../utils/DateConversion";
import shareIcon from "../../assets/share_icon.png";
import "./CardEvent.scss";

interface EventDataProps {
  eventData: EventData;
  openModalAction: () => void;
}

const CardEvent = ({ eventData, openModalAction }: EventDataProps) => {
  return (
    <div className="CardEvent">
      <div className="CardEvent__banner">
        <div>
          <img src={shareIcon} alt="share event" />
        </div>
      </div>
      <img
        className="CardEvent__image"
        src={eventData.eventImageUrl}
        alt={`image of event ${eventData.id}`}
        onClick={openModalAction}
      />
      <div className="CardEvent__info">
        <p className="CardEvent__text">{eventData.eventLink}</p>
        <p className="CardEvent__text">{toShortDate(eventData.startDate)}</p>
      </div>
    </div>
  );
};

export default CardEvent;
