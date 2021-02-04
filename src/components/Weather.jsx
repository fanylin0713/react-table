import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import apis from "../redux/apis";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import WeatherIcon from './WeatherIcon';
import LocationDialog from './LocationDialog';
import { setDialogOpen, setWeather } from '../redux/action';

const styles = () => ({
	paper: {
		backgroundColor: '#ededed',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		position: 'relative',
		minWidth: '360px',
		boxShadow: '0 1px 3px 0 #999999',
		boxSizing: 'border-box',
		padding: '20px 15px',
		backgroundColor: '#C4E1FF'
	},
	weatherSvg: {
		width: '150px',
		height: 'auto',
		margin: '40px 27% 50px 27%'
	},
	weatherInformation: {
		padding: '10px 15px 10px 15px',
		margin: '10px 0 0 0'
	},
	svg: {
		width: '25px',
		height: 'auto'
	}
});

const useStyles = makeStyles(styles);

const Weather = () => {
	const dispatch = useDispatch();
	const location = useSelector(state => state.weatherLocation.location)
	const weather = useSelector(state => state.weatherLocation.weather)
	const classes = useStyles();
	const date = new Date().getDay();
	const dayList = ['日', '一', '二', '三', '四', '五', '六'];
	const AuthorizationKey = 'CWB-330FC854-CB5C-4364-AE2C-600F34DCF8AE'
console.log(weather)
	const fetchData = useCallback(() => {
		const fetchingData = async () => {
			const [realTimeData, weather36hData] = await Promise.all([
				fetachGetRealtimeWeather(),
				fetchGetWeather36h(),
			]);

			dispatch(setWeather({
				...realTimeData,
				...weather36hData
			}))
		};

		fetchingData();
	}, []);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	const fetachGetRealtimeWeather = () => {
		return apis.fetachGetRealtimeWeather({ AuthorizationKey: AuthorizationKey, locationName: location.place })
			.then(res => {
				const data = res.data.records.location[0];
				const weatherElements = data.weatherElement.reduce(
					(neededElements, item) => {
						if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
							neededElements[item.elementName] = item.elementValue;
						}
						return neededElements;
					},
					{}
				);
				return {
					location: data.locationName,
					time: data.time.obsTime,
					wind: weatherElements.WDSD,
					temp: weatherElements.TEMP,
					humid: weatherElements.HUMD,
				}
			}).catch(err => {
				console.log(err);
			})
	}

	const fetchGetWeather36h = () => {
		return apis.fetchGetWeather36h({ AuthorizationKey: AuthorizationKey, locationName: location.city })
			.then((res) => {
				const locationData = res.data.records.location[0];
				const weatherElements = locationData.weatherElement.map(el => el.time[0].parameter);
				return {
					description: weatherElements[0].parameterName,
					weatherCode: weatherElements[0].parameterValue,
					rainPossibility: weatherElements[1].parameterName,
					comfortability: weatherElements[3].parameterName,
					maxTemp: weatherElements[4].parameterName,
					minTemp: weatherElements[2].parameterName,
				}
			});
	}

	return (
		<>
			<LocationDialog />
			<Paper className={classes.paper}>
				<Box className={classes.container} >
					<Button fullWidth onClick={() => dispatch(setDialogOpen(true))}>
						<Typography align='center' variant='h6' >{location.city}</Typography>
					</Button>
					<WeatherIcon weatherCode={weather.weatherCode} />
					<Paper className={classes.weatherInformation}>
						<Box pb={3}>
							<Typography variant='body1'>星期{dayList[date]}</Typography>
							<Typography variant='body1'>{`${weather.description}、${weather.comfortability}`}</Typography>
						</Box>
						<Box pb={3}>
							<Typography align='center' variant='h3'>{Math.round(weather.temp)}℃</Typography>
							<Typography align='center' variant='body2'>{weather.minTemp}℃~{weather.maxTemp}℃</Typography>
						</Box>
						<Typography align='right' variant='body2'>風速： {weather.wind} m/h</Typography>
						<Typography align='right' variant='body2'>濕度：{Math.round(weather.humid * 100)} %</Typography>
						<Typography align='right' variant='body2'>降雨機率：{weather.rainPossibility} %</Typography>
					</Paper>
				</Box>
			</Paper>
		</>
	)
};

export default Weather