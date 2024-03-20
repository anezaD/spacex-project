import { useQuery, gql } from '@apollo/client';
import { useMemo } from 'react';
import React from 'react';

//All data for "Admin" user 
const Data_Launches = gql`
 query Lauches {
   launches {
    mission_name
    id
    launch_date_local
    launch_year
    rocket {
        rocket_name
        rocket {
            mass {
                kg
            }
        }
    }
  }
}
`;

//Recent Data for "other types of" user
const Data_Launches_Year = gql`
query LaunchesByYear($year: String!) {
  launches(find: { launch_year: $year }) {
      mission_name
      id
      launch_date_local
      launch_year
      rocket {
        rocket_name
        rocket {
          mass {
            kg
          }
        }
      }
    }
  }
`;

const FetchLaunches = ({ children }) => {

    const user = { permissions: 'admin' };

    const { loading, error, data } = useQuery(user.permissions === 'admin' ? Data_Launches : Data_Launches_Year, {
        variables: {
            year: "2015"
        }
    });

    const filteredRows = useMemo(() => {
        return (
            data?.launches.filter(launch => {
                if (user.permissions === 'admin') {
                    return true;
                }
                else {
                    return launch.launch_year === "2015";
                }
            }) || []
        );

    }, [data, user.permissions]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return children(filteredRows);
}

export default FetchLaunches;