import { gql, useQuery } from "@apollo/client";

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

  if (loading) return <p>loading events</p>;

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
