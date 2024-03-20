import { useEffect, useState } from "react";
import { styled } from '@mui/system';

import Button from '@mui/material/Button';
import RocketIcon from '@mui/icons-material/Rocket';
import GigaJouleFormat from '../util/GigaJouleFormat';

const CenteredDiv = styled('div')(({ theme }) => (theme.customStyles.centerPosition));

const EnergyConsumptionResults = ({ onFetchMasses, masses }) => {
    const fuelEnergyPerKg = 1.35 * Math.pow(10, 7);
    const fuelMassPerKg = 15;

    const [energyConsumption, setEnergyConsumption] = useState(0);
    const [totalSelectedLaunches, setTotalSelectedLaunches] = useState(0);

    useEffect(() => {
        const totalFuelMass = masses.reduce((total, val) => total + val * fuelMassPerKg, 0);
        const totalEnergyConsumption = totalFuelMass * fuelEnergyPerKg;
        setEnergyConsumption(totalEnergyConsumption);
        setTotalSelectedLaunches(masses.length);
    }, [masses, fuelEnergyPerKg]);

    return (
        <div>
            <CenteredDiv>
                {energyConsumption > 0 && <div>
                    <div> <strong>Total Launches: </strong> {totalSelectedLaunches}</div>
                    <div><strong>Total Energy Consumption: </strong> <GigaJouleFormat value={energyConsumption} /></div>
                </div>}
                {energyConsumption === 0 && <div> Select launches from the table below </div>}
            </CenteredDiv>
            <CenteredDiv>
                <Button variant="outlined" size="large" startIcon={<RocketIcon />} onClick={onFetchMasses}> Calculate Energy </Button>
            </CenteredDiv>
        </div>
    )
}

export default EnergyConsumptionResults;