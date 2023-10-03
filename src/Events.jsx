import { gql, useQuery } from "@apollo/client";
import { LoadingSpinner } from "./LoadingSpinner.jsx";

const EVENTS_QUERY = gql`
  query AllEvents {
    allEvents {
      id
      title
      date
    }
  }
`;

export function Events() {
  const { loading, data } = useQuery(EVENTS_QUERY);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="column">
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
