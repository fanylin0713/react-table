import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { ReactComponent as Sun } from '../images/sun.svg';
import { ReactComponent as Moon } from '../images/moon.svg';
import { ReactComponent as SunnyCloud } from '../images/sunnyCloud.svg';
import { ReactComponent as Cloudy } from '../images/clouds.svg';
import { ReactComponent as RainnyCloud } from '../images/rainnyCloud.svg';
import { ReactComponent as ThunderStorm } from '../images/thunderstorm.svg';
import { ReactComponent as CloudyFog } from '../images/cloudyFog.svg';
import { ReactComponent as SunnyFog } from '../images/sunnyFog.svg';
import { ReactComponent as Snowy } from '../images/snowy.svg';

const styles = () => ({
	weatherSvg: {
		width: '150px',
		height: 'auto',
		margin: '40px 27% 50px 27%'
	}
});

const useStyles = makeStyles(styles);

const time = new Date().getHours();

const weatherTypes = {
	isClear: [1],
	isClearCloud: [2, 3],
	isCloudy: [4, 5, 6, 7, 27],
	isRainyCloud: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39, 41],
	isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36],
	isCloudyFog: [26, 27, 28],
	isSunnyFog: [24, 25],
	isSnowing: [23, 37, 42],
};

const WeatherIcon = () => {
	const classes = useStyles();
	const weatherCode = useSelector(state => state.weatherLocation.weather.weatherCode)
	const [weatherNow, setWeatherNow] = useState('');

	const weatherCode2Type = (value) => {
		const [weatherType] =
			Object.entries(weatherTypes).find(([weatherType, weatherCodes]) =>
				weatherCodes.includes(Number(value))
			) || [];

		return setWeatherNow(weatherType);
	};

	React.useEffect(() => {
		weatherCode2Type(weatherCode);
	}, [weatherCode]);

	const renderWeather = () => {
		if (weatherNow === 'isClear') {
			return ((time > 17 || time < 5) ? <Moon className={classes.weatherSvg}/> : <Sun className={classes.weatherSvg}/>)
		}
		if (weatherNow === 'isClearCloud') {
			return <SunnyCloud className={classes.weatherSvg}/>
		}
		if (weatherNow === 'isCloudy') {
			return <Cloudy className={classes.weatherSvg}/>
		}
		if (weatherNow === 'isRainyCloud') {
			return <RainnyCloud className={classes.weatherSvg}/>
		}
		if (weatherNow === 'isThunderstorm') {
			return <ThunderStorm className={classes.weatherSvg}/>
		}
		if (weatherNow === 'isCloudyFog') {
			return <CloudyFog className={classes.weatherSvg}/>
		}
		if (weatherNow === 'isSunnyFog') {
			return <SunnyFog className={classes.weatherSvg}/>
		}
		if (weatherNow === 'isSnowing') {
			return <Snowy className={classes.weatherSvg}/>
		}
		return <div />
	}

	return (
		renderWeather()
	);
};

export default WeatherIcon;