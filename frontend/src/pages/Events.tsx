import { useState, useEffect } from "react";
import EventPost from "../components/Event/CardEvent";
import Modal from "../components/UI/Modal";
import CardEventModal from "../components/Event/CardEventModal";
import EventData from "../models/EventData";
import { getAllEvents } from "../clients/backendApiClient";
import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import "./Events.scss";

export const Events = () => {
  const [selectedEventDetails, setSelectedEventDetails] = useState<EventData>();
  const [eventData, setEventData] = useState<EventData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  const fetchEvents = async () => {
    setIsLoading(true);
    setEventData(undefined);
    setErrorMessage(undefined);

    await getAllEvents()
      .then((data) => setEventData(data.events))
      .catch(() => setErrorMessage("Unable to load events"));

    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (isLoading || errorMessage) {
    return (
      <main>
        <section className="section-dark">
          <div className="container Events__loader">
            <WhaleLoader
              isLoading={isLoading}
              message={isLoading ? "Loading..." : errorMessage}
            />
            {errorMessage && <Button onClick={fetchEvents}>Try Again</Button>}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <h1>All Events</h1>
      {eventData && eventData.length > 0 ? (
        <>
          <section>
            <div className="container EventsGallery">
              {eventData.map((event) => {
                return (
                  <EventPost
                    eventData={event}
                    openModalAction={() => setSelectedEventDetails(event)}
                  />
                );
              })}
            </div>
          </section>

          {selectedEventDetails && (
            <Modal closeAction={() => setSelectedEventDetails(undefined)}>
              <CardEventModal eventData={selectedEventDetails} />
            </Modal>
          )}
        </>
      ) : (
        <section className="section-dark">
          <div className="container">
            <h2 className="Events__None__heading">No Events Found</h2>
          </div>
        </section>
      )}
    </main>
  );
};

export default Events;
