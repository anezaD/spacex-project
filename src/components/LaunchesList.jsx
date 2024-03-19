import { useQuery, gql } from '@apollo/client';
import { useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dateFormatter from '../util/DateFormatter';
import EnergyConsumptionResults from './EnergyConsumptionResults';

//All data for "Admin" user 
const Data_Launches = gql`
 query {
   launches {
    mission_name
    id
    launch_date_local
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

//Recent Data for "other types of users" user
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


const LaunchesList = () => {

    const user = { permissions: 'guest' };
    const { loading, error, data } = useQuery(user.permissions === 'admin' ? Data_Launches : Data_Launches_Year, {
        variables: {
            year: "2017" // You can change this year based on the user's permissions
        }
    });

    const [selectedLaunches, setSelectedLaunches] = useState([]);
    const [massOfLaunches, setMassOfLaunches] = useState([]);

    const fetchMasses = useCallback(() => {
        const massOfLaunchesArray = selectedLaunches.map(id => {
            const item = data.launches.find(launch => launch.id === id);
            console.log(item);
            return item ? item.rocket.rocket.mass.kg : null;
        });

        setMassOfLaunches(massOfLaunchesArray);
    }, [selectedLaunches, data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    const columns =
        [
            { field: 'id', headerName: 'Launch ID', width: 200 },
            { field: 'mission_name', headerName: 'Mission Name', width: 200 },
            {
                field: 'rocket', headerName: 'Rocket Name', width: 200,
                valueGetter: (params) => {
                    return params.row.rocket.rocket_name;
                },
            },
            {
                field: 'launch_date_local', headerName: 'Launch Date', width: 200,
                valueFormatter: (params) => {
                    const date = new Date(params.value);
                    return dateFormatter.format(date);
                }
            },
            { field: 'launch_success', headerName: 'Success', width: 150 }
        ];

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem", height: 700, width: '80%' }}>
            <div>
                <EnergyConsumptionResults onFetchMasses={fetchMasses} masses={massOfLaunches} />
                <DataGrid
                    rows={data.launches}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 25 },
                        },
                    }}

                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    checkboxSelection
                    onRowSelectionModelChange={(selectedLaunchIds) => {
                        console.log(selectedLaunchIds);
                        setSelectedLaunches(selectedLaunchIds);
                    }}
                />

            </div>
        </div>
    );
}

export default LaunchesList;