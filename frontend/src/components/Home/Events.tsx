import { useEffect, useState } from "react";
import { getAllEvents } from "../../clients/backendApiClient";
import { toShortDate } from "../../utils/DateConversion";
import { Link } from "react-router-dom";
import EventData from "../../models/EventData";
import "./EventsAndLeaderboardSection.scss";

const Events = () => {
  const [events, setEvents] = useState<EventData[]>();

  useEffect(() => {
    getAllEvents()
      .then((data) => setEvents(data.events))
      .catch();
  }, []);

  return (
    <>
      <div className="Board">
        <h3 className="Board__Title">Events</h3>
        <hr className="Board__Divider" />
        <div>
          <table className="Board__Table">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Link</th>
            </tr>
            {events &&
              events.map((event) => {
                return (
                  <tr className="Board__Item">
                    <td>
                      <a href={`${event.eventLink}`} target="_blank">
                        <img
                          className="Item_Thumbnail"
                          src={event.eventImageUrl}
                          alt=""
                        />
                      </a>
                    </td>
                    <td>{event.location}</td>
                    <td>{toShortDate(event.startDate)}</td>

                    <td className="Board__Item__svg">
                      <Link to={`/events`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                          />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </>
  );
};

export default Events;
