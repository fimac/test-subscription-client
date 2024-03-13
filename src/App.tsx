import "./App.css";

import { useSubscription, gql } from "@apollo/client";

const HOURLY_LOGS_SUBSCRIPTION = gql`
  subscription HourlyLogUpdate($workspaceId: String!) {
    hourlyLogUpdate(workspaceId: $workspaceId) {
      hour
      totalQueries
    }
  }
`;

const FREQUENT_QUERIES_SUBSCRIPTION = gql`
  subscription FrequentQueryUpdate($workspaceId: String!) {
    frequentQueryUpdate(workspaceId: $workspaceId) {
      databaseName
      rawQuery
      usageCount
      userIdentity
    }
  }
`;

const EXECUTION_TIME_SUBSCRIPTION = gql`
  subscription ExecutionTimeUpdate($workspaceId: String!) {
    executionTimeUpdate(workspaceId: $workspaceId) {
      hour
      executionTime
    }
  }
`;

const TOP_QUERIES_WITH_MOST_ROWS_RETURNED_SUBSCRIPTION = gql`
  subscription QueryWithRowsReturnedUpdate($workspaceId: String!) {
    queryWithRowsReturnedUpdate(workspaceId: $workspaceId) {
      rawQuery
      rowsReturnedCount
    }
  }
`;

function LatestLogs() {
  const { data: hl_data, loading: hourly_logs_loading } = useSubscription(
    HOURLY_LOGS_SUBSCRIPTION,
    {
      variables: { workspaceId: "7D3XJNYSPD52OOF4" },
    }
  );

  const { data: fq_data, loading: fq_loading } = useSubscription(
    FREQUENT_QUERIES_SUBSCRIPTION,
    {
      variables: { workspaceId: "7D3XJNYSPD52OOF4" },
    }
  );
  const { data: et_data, loading: et_loading } = useSubscription(
    EXECUTION_TIME_SUBSCRIPTION,
    {
      variables: { workspaceId: "7D3XJNYSPD52OOF4" },
    }
  );
  console.log(et_data, "@@@@@@@@");

  const { data: tq_data, loading: tq_loading } = useSubscription(
    TOP_QUERIES_WITH_MOST_ROWS_RETURNED_SUBSCRIPTION,
    {
      variables: { workspaceId: "7D3XJNYSPD52OOF4" },
    }
  );

  console.log(tq_data, "$$$$$$$");

  if (hourly_logs_loading || fq_loading || tq_loading || et_loading)
    return <h4>Loading new logs...</h4>;

  return (
    <>
      <table>
        <caption>Top 10 most frequent queries</caption>
        <thead>
          <tr>
            <th>Database</th>
            <th>Query</th>
            <th>Usage Count</th>
            <th>Identity</th>
          </tr>
        </thead>
        <tbody>
          {fq_data.frequentQueryUpdate.map(
            ({ databaseName, rawQuery, usageCount, userIdentity }) => (
              <tr>
                <td>{databaseName}</td>
                <td>{rawQuery}</td>
                <td>{usageCount}</td>
                <td>{userIdentity}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />
      <table>
        <caption>Top 10 queries the most rows returned</caption>
        <thead>
          <tr>
            <th>Query</th>
            <th>Rows returned count</th>
          </tr>
        </thead>
        <tbody>
          {tq_data.queryWithRowsReturnedUpdate.map(
            ({ rawQuery, rowsReturnedCount }) => (
              <tr>
                <td>{rawQuery}</td>
                <td>{rowsReturnedCount}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />
      <table>
        <caption>Average execution time for all queries per hour</caption>
        <thead>
          <tr>
            <th>Hour</th>
            <th>Execution time</th>
          </tr>
        </thead>
        <tbody>
          {et_data &&
            et_data.executionTimeUpdate.map(({ hour, executionTime }, i) => (
              <tr key={i}>
                <td>{hour}</td>
                <td>{executionTime}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />
      <br />
      <table>
        <caption>Total queries per hour</caption>
        <thead>
          <tr>
            <th>Hour</th>
            <th>Total Queries</th>
          </tr>
        </thead>
        <tbody>
          {hl_data.hourlyLogUpdate.map(({ hour, totalQueries }) => (
            <tr key={hour}>
              <td>{hour}</td>
              <td>{totalQueries}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
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
      <h2>Aggregations 🚀</h2>
      <LatestLogs /> {/* Render the latestLogs component here */}
    </div>
  );
}
