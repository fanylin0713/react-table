import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LocationDialog from './LocationDialog';
import { ReactComponent as Sun } from '../images/sun.svg';
import { setDialogOpen } from '../redux/action';

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

const mapStateToProps = (state) => {
	console.log(state); return ({
		city: state.weatherLocation.city,
		place: state.weatherLocation.place,
	})
}

const Weather = ({ city, place }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const date = new Date().getDay();
	const dayList = ['日', '一', '二', '三', '四', '五', '六'];
	const AuthorizationKey = 'CWB-330FC854-CB5C-4364-AE2C-600F34DCF8AE'
	const weatherUrl = `/v1/rest/datastore/O-A0003-001?Authorization=${AuthorizationKey}&locationName=${place}`
	const weather36hUrl = `/v1/rest/datastore/F-C0032-001?Authorization=${AuthorizationKey}&locationName=${city}`
	const [weatherStatus, setWeatherStatus] = useState({})

	const fetchData = useCallback(() => {
		const fetchingData = async () => {
			const [realTimeData, weather36hData] = await Promise.all([
				fetachGetRealtimeWeather(),
				fetchGetWeather36h(),
			]);

			setWeatherStatus({
				...realTimeData,
				...weather36hData
			})
		};

		fetchingData();
	}, []);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	const fetachGetRealtimeWeather = () => {
		return axios.get(weatherUrl)
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
		return axios.get(weather36hUrl)
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

	const handleOpenDialog = () => {
		dispatch(setDialogOpen(true))
	}

	return (
		<>
			<LocationDialog />
			<Paper className={classes.paper}>
				<Box className={classes.container} >
					<Button fullWidth onClick={handleOpenDialog}>
						<Typography align='center' variant='h6' >{weatherStatus.location}</Typography>
					</Button>
					<Sun className={classes.weatherSvg} />
					<Paper className={classes.weatherInformation}>
						<Box pb={3}>
							<Typography variant='body1'>星期{dayList[date]}</Typography>
							<Typography variant='body1'>{`${weatherStatus.description}、${weatherStatus.comfortability}`}</Typography>
						</Box>
						<Box pb={3}>
							<Typography align='center' variant='h3'>{Math.round(weatherStatus.temp)}℃</Typography>
							<Typography align='center' variant='body2'>{weatherStatus.minTemp}℃~{weatherStatus.maxTemp}℃</Typography>
						</Box>
						<Typography align='right' variant='body2'>風速： {weatherStatus.wind} m/h</Typography>
						<Typography align='right' variant='body2'>濕度：{Math.round(weatherStatus.humid * 100)} %</Typography>
						<Typography align='right' variant='body2'>降雨機率：{weatherStatus.rainPossibility} %</Typography>
					</Paper>
				</Box>
			</Paper>
		</>
	)
};


export default connect(
	mapStateToProps
)(Weather);