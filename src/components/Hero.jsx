import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import backgroundImage from "../imgs/spacex-launch.jpg"

const HeroText = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
    },
}));

const Hero = () => {
    return (
        <div className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <HeroText variant="h1" className="hero-text">SpaceX launches <br /> Find more! </HeroText>
        </div >
    );
};

export default Hero;