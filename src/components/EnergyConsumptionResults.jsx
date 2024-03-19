import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import RocketIcon from '@mui/icons-material/Rocket';
import GigaJouleFormat from '../util/GigaJouleFormat';


const EnergyConsumptionResults = ({ onFetchMasses, masses }) => {
    const fuelEnergyPerKg = 1.35 * Math.pow(10, 7);
    const fuelMassPerKg = 15;

    const [energyConsumption, setEnergyConsumption] = useState(0);
    const [showEnergy, setShowEnergy] = useState(false);
    const [totalSelectedLaunches, setTotalSelectedLaunches] = useState(0);

    useEffect(() => {
        const totalFuelMass = masses.reduce((total, val) => total + val * fuelMassPerKg, 0);
        const totalEnergyConsumption = totalFuelMass * fuelEnergyPerKg;
        setEnergyConsumption(totalEnergyConsumption);
        setShowEnergy(true);
        setTotalSelectedLaunches(masses.length);
    }, [masses, fuelEnergyPerKg]);

    return (
        <div>
            <div>
                {showEnergy && energyConsumption > 0 && <div>
                    <div> <strong>Total Launches: </strong> {totalSelectedLaunches}</div>
                    <div><strong>Total Energy Consumption: </strong> <GigaJouleFormat value={energyConsumption} /></div>
                </div>}
                {showEnergy && energyConsumption === 0 && <div> Select launches from the table below </div>}
            </div>
            <div>
                <Button variant="outlined" size="large" startIcon={<RocketIcon />} onClick={onFetchMasses}> Calculate Energy </Button>
            </div>
        </div>
    )
}

export default EnergyConsumptionResults;