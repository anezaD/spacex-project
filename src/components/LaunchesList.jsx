import { useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';

import EnergyConsumptionResults from './EnergyConsumptionResults';
import dateFormatter from '../util/DateFormatter';
import kilogramFormatter from '../util/KilogramFormatter';
import ApexCharts from 'react-apexcharts';


//style component

const CenteredDiv = styled('div')(({ theme }) => ({
    ...theme.customStyles.centerPosition,
}));

const DataDiv = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
    height: 700,
    margin: 'auto',
    width: '70%'
}
));

// end - style component 


const LaunchesList = ({ launches }) => {

    const [selectedLaunches, setSelectedLaunches] = useState([]);
    const [massOfLaunches, setMassOfLaunches] = useState([]);
    const [nameOfMissions, setNameOfMissions] = useState([]);

    const fetchMasses = useCallback(() => {
        const selectedRowsData = launches.filter(launch => selectedLaunches.includes(launch.id));
        setNameOfMissions(selectedRowsData.map(launch => launch.mission_name));
        setMassOfLaunches(selectedRowsData.map(launch => launch.rocket.rocket.mass.kg));
    }, [launches, selectedLaunches]);

    const chartOptions = {
        chart: {
            type: 'bar'
        },
        xaxis: {
            categories: nameOfMissions.slice(0, 5)
        }
    };

    const chartSeries = [{
        name: 'Mass',
        data: massOfLaunches.slice(0, 5)
    }];

    const columns =
        [
            { field: 'id', headerName: 'Launch ID', flex: 1, minWidth: 200 },
            { field: 'mission_name', headerName: 'Mission Name', flex: 1, minWidth: 200 },
            {
                field: 'rocket', headerName: 'Rocket Name', flex: 1, minWidth: 200,
                valueGetter: (params) => {
                    return params.row.rocket.rocket_name;
                },
            },
            {
                field: 'launch_date_local', headerName: 'Launch Date', flex: 1, minWidth: 200,
                valueFormatter: (params) => {
                    const date = new Date(params.value);
                    return dateFormatter.format(date);
                },
            },
            {
                field: 'mass', headerName: 'Mass of rochet', flex: 1, minWidth: 200,
                valueGetter: (params) => {
                    return params.row.rocket.rocket.mass.kg;

                },
                valueFormatter: (params) => {
                    return kilogramFormatter.format(params.value);
                },
            }
        ];

    return (
        <>
            <EnergyConsumptionResults masses={massOfLaunches} onFetchMasses={fetchMasses} />
            <CenteredDiv >
                <DataDiv >
                    <DataGrid
                        rows={launches}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 25 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25, 50, 100]}
                        checkboxSelection
                        onRowSelectionModelChange={(newSelectionModel) => {
                            setSelectedLaunches(newSelectionModel);
                        }}
                        rowSelectionModel={selectedLaunches}
                    />
                </DataDiv>
            </CenteredDiv>
            <CenteredDiv >
                <ApexCharts
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    height={450}
                    width={450}
                />
            </CenteredDiv>
        </>
    );
}

export default LaunchesList;