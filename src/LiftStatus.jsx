import { gql, useQuery, useMutation } from "@apollo/client";
import { StatusIndicator } from "./StatusIndicator.jsx";
import { LoadingSpinner } from "./LoadingSpinner.jsx";

const QUERY = gql`
  query AllLifts {
    allLifts {
      id
      name
      status
      capacity
      trailAccess {
        id
        name
      }
    }
  }
`;

const MUTATION = gql`
  mutation SetLiftStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      name
      status
    }
  }
`;

export function LiftStatus() {
  const { loading, data } = useQuery(QUERY);
  const [setStatus] = useMutation(MUTATION);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="column">
      <h2>Lift Status</h2>
      {data && !loading && (
        <table className="lifts">
          <thead>
            <tr>
              <th>Lift Name</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>
            {data.allLifts.map((lift) => (
              <tr key={lift.id}>
                <td>{lift.name}</td>
                <td>
                  <StatusIndicator
                    status={lift.status}
                    onChange={(status) =>
                      setStatus({
                        variables: {
                          id: lift.id,
                          status
                        }
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
