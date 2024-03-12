import "./App.css";

import { useQuery, useSubscription, gql } from "@apollo/client";

const LOGS_SUBSCRIPTION = gql`
  subscription {
    onLogsCreated {
      count
    }
  }
`;

function LatestLogs() {
  const { data, loading, error } = useSubscription(LOGS_SUBSCRIPTION);

  if (loading) return <h4>Loading new logs...</h4>;
  if (error) return <h4>Error: {error.message}</h4>;
  console.log("hitting", data);
  return <h4>New logs: {data.onLogsCreated.count}</h4>;
}

// const DisplayLocations = () => {
//   const { loading, error, data } = useQuery(GET_LOCATIONS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error : {error.message}</p>;

//   return data.locations.map(({ id, name, description, photo }) => (
//     <div key={id}>
//       <h3>{name}</h3>
//       <img width="400" height="250" alt="location-reference" src={`${photo}`} />
//       <br />
//       <b>About this location:</b>
//       <p>{description}</p>
//       <br />
//     </div>
//   ));
// };

export default function App() {
  return (
    <div>
      <h2>Subs 🚀</h2>
      <LatestLogs /> {/* Render the latestLogs component here */}
    </div>
  );
}
