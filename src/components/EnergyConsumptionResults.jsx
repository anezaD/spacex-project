import { useState } from "react";

const EnergyConsumptionResults = ({ massOfSelectedLaunches }) => {
    const [energyConsumption, setEnergyConsumption] = useState(0);
    const [showEnergy, setShowEnergy] = useState(false);

    const fuelEnergyPerKg = 1.35 * Math.pow(10, 7);
    const fuelMassPerKg = 15;

    const showEnergyConsumptionHandrler = () => {

        const totalFuelMass = massOfSelectedLaunches.reduce((total, val) => total + val * fuelMassPerKg, 0);
        const totalEnergyConsumption = totalFuelMass * fuelEnergyPerKg;

        setEnergyConsumption(totalEnergyConsumption);
        setShowEnergy(true);
        console.log("massOfSelectedLaunches", massOfSelectedLaunches);
        console.log("Totel Energy", totalEnergyConsumption);
    }

    return (
        <div>
            {/* Button component */}
            <button type='text' onClick={showEnergyConsumptionHandrler}> Energy Consmption </button>

            {/* Results Component */}
            {showEnergy && energyConsumption > 0 && <div> {energyConsumption} </div>}
            {showEnergy && energyConsumption === 0 && <div> ther is no Selected Energy </div>}

        </div>
    )
}


export default EnergyConsumptionResults;