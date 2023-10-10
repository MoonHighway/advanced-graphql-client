import { gql, useQuery, useFragment } from "@apollo/client";
import { LoadingSpinner } from "./LoadingSpinner.jsx";

const EventFragment = gql`
  fragment EventFragment on Event {
    title
    date
  }
`;

const EVENTS_QUERY = gql`
  query AllEvents {
    allEvents {
      id
      ...EventFragment
    }
  }
  ${EventFragment}
`;

function SpecialEvent(props) {
  const { complete, data } = useFragment({
    fragment: EventFragment,
    fragmentName: "EventFragment",
    from: {
      __typename: "Event",
      id: props.id
    }
  });
  return <h2>{complete ? data.title : "incomplete"}</h2>;
}

export function Events() {
  const { loading, data } = useQuery(EVENTS_QUERY);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="column">
      <h2>Upcoming Events</h2>
      <SpecialEvent id="01" />
      <ul>
        {data.allEvents.map((event) => (
          <li key={event.id}>
            {event.date} - {event.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
