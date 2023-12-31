import { useEffect, useState } from "react";
import { getLatestEvents } from "../../clients/backendApiClient";
import { toShortDate } from "../../utils/DateConversion";
import EventData from "../../models/EventData";
import WhaleLoader from "../UI/WhaleLoader";
import Modal from "../UI/Modal";
import CardEventModal from "../Event/CardEventModal";
import "./EventsAndLeaderboardSection.scss";

const Events = () => {
  const [selectedEventDetails, setSelectedEventDetails] = useState<EventData>();
  const [events, setEvents] = useState<EventData[]>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getLatestEvents()
      .then((data) => setEvents(data.events))
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <div className="Board">
        <h3 className="Board__Title">Events</h3>
        <hr className="Board__Divider" />
        <div>
          <div className="Board__Table">
            {events ? (
              <>
                <div className="Board__Table__Row">
                  <div className="Board__Table__Row__Item Board__Table__Row__Item--heading">
                    Event
                  </div>
                  <div className="Board__Table__Row__Item Board__Table__Row__Item--heading">
                    Location
                  </div>
                  <div className="Board__Table__Row__Item Board__Table__Row__Item--heading">
                    Date
                  </div>
                </div>
                {events.map((event) => (
                  <div
                    className="Board__Table__Row"
                    onClick={() => setSelectedEventDetails(event)}
                  >
                    <div className="Board__Table__Row__Item">
                      <img
                        className="Item_Thumbnail"
                        src={event.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="Board__Table__Row__Item">
                      {event.location}
                    </div>
                    <div className="Board__Table__Row__Item">
                      {toShortDate(event.startDate)}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="Board__Table__Row">
                <WhaleLoader
                  isLoading={!error}
                  message={
                    error ? "Could not load events at this time" : "Loading..."
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedEventDetails && (
        <Modal closeAction={() => setSelectedEventDetails(undefined)}>
          <CardEventModal eventData={selectedEventDetails} />
        </Modal>
      )}
    </>
  );
};

export default Events;
