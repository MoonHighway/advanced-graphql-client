import { gql, useQuery } from "@apollo/client";
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
  const { loading, data } = useQuery(HOTELS_QUERY);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="column">
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
