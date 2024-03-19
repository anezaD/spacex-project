
const GigaJouleFormat = ({ value }) => {
    const numberGJ = value / 1e9;
    const formattedGigajoules = new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(numberGJ) + ' GJ';

    return (formattedGigajoules);
}

export default GigaJouleFormat;
