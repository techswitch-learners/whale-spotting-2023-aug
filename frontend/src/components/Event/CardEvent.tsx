import EventData from "../../models/EventData";
import { toShortDate } from "../../utils/DateConversion";
import "./CardEvent.scss";

interface EventDataProps {
  eventData: EventData;
  openModalAction: () => void;
}

const CardEvent = ({ eventData, openModalAction }: EventDataProps) => {
  return (
    <div className="CardEvent">
      <img
        className="CardEvent__image"
        src={eventData.eventImageUrl}
        alt={`image of event ${eventData.id}`}
        onClick={openModalAction}
      />
      <div className="CardEvent__info">
        <p className="CardEvent__title">{eventData.location}</p>
        <p className="CardEvent__text">{toShortDate(eventData.startDate)}</p>
      </div>
    </div>
  );
};

export default CardEvent;
