import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import backgroundImage from "../imgs/spacex-launch.jpg"
import SouthIcon from '@mui/icons-material/South';

const HeroText = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        fontSize: '3rem',
    },
    color: 'black',
}));

const Hero = () => {
    return (
        <div className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <HeroText variant="h1" >SpaceX launches <br /> Find out more <br /><SouthIcon sx={{ fontSize: { xs: 50, md: 80 } }} /> </HeroText>
        </div >
    );
};

export default Hero;