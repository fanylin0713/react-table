import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { ReactComponent as Sun } from '../images/sun.svg';
import { ReactComponent as CouldyDay } from '../images/cloudy-day.svg';
// import { ReactComponent as Sun } from '../images/sun.svg';
// import { ReactComponent as Sun } from '../images/sun.svg';

const styles = () => ({
	weatherSvg: {
		width: '150px',
		height: 'auto',
		margin: '40px 27% 50px 27%'
	}
});

const useStyles = makeStyles(styles);

const WeatherIcon = ({ weatherCode }) => {
	const classes = useStyles();

	const renderWeather = () => {
		if (weatherCode === 1) {
			return (<Sun className={classes.weatherSvg} />)
		}
		if (weatherCode > 1 && weatherCode < 4){
			return (<CouldyDay className={classes.weatherSvg} />)
		}
		return <div/>
	}

	return (
		renderWeather()
	);
};

export default WeatherIcon;