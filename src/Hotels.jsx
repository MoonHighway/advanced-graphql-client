import { gql, useSuspenseQuery } from "@apollo/client";
import { LoadingSpinner } from "./LoadingSpinner.jsx";

const HOTELS_QUERY = gql`
  query AllHotels {
    allHotels {
      id
      name
      avgCost
    }
  }
`;

export function Hotels() {
  const { loading, data } = useSuspenseQuery(HOTELS_QUERY, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first"
  });

  if (loading) return <LoadingSpinner />;

  return (
    <section className="column">
      <h2>Local Hotels</h2>
      <ul>
        {data.allHotels.map((hotel) => (
          <li key={hotel.id}>
            {hotel.name} - ${hotel.avgCost}
          </li>
        ))}
      </ul>
    </section>
  );
}
