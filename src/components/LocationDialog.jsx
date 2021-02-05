import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import apis from "../redux/apis";

import { setDialogOpen, setLocation, setWeather } from '../redux/action';

const LocationDialog = () => {
	const dispatch = useDispatch();
	const location = useSelector(state => state.weatherLocation.location);
	const open = useSelector(state => state.weatherLocation.dialogOpen);
	const AuthorizationKey = 'CWB-330FC854-CB5C-4364-AE2C-600F34DCF8AE';

	const locationData = [
		{
			city: '臺北市',
			place: '臺北'
		},
		{
			city: '新北市',
			place: '淡水'
		},
		{
			city: '基隆市',
			place: '基隆'
		},
		{
			city: '桃園市',
			place: '新屋'
		},
		{
			city: '新竹縣',
			place: '新竹'
		},
		{
			city: '苗栗縣',
			place: '國三N119K'
		},
		{
			city: '臺中市',
			place: '臺中'
		},
		{
			city: '彰化縣',
			place: '彰師大'
		},
		{
			city: '南投縣',
			place: '日月潭'
		},
		{
			city: '雲林縣',
			place: '古坑'
		},
		{
			city: '嘉義市',
			place: '嘉義'
		},
		{
			city: '嘉義縣',
			place: '國一N250K'
		},
		{
			city: '臺南市',
			place: '南區中心'
		},
		{
			city: '高雄市',
			place: '高雄'
		},
		{
			city: '屏東縣',
			place: '恆春'
		},
		{
			city: '宜蘭縣',
			place: '宜蘭'
		},
		{
			city: '花蓮縣',
			place: '花蓮'
		},
		{
			city: '臺東縣',
			place: '臺東'
		},
		{
			city: '澎湖縣',
			place: '澎湖'
		},
		{
			city: '金門縣',
			place: '金門'
		},
		{
			city: '連江縣',
			place: '馬祖'
		},
	];

	const handleChangeLocation = () => {
		const fetchingData = async () => {
			const [realTimeData, weather36hData] = await Promise.all([
				fetachGetRealtimeWeather(),
				fetchGetWeather36h(),
			]);

			dispatch(setWeather({
				...realTimeData,
				...weather36hData
			}));
			dispatch(setDialogOpen(false))
		};

		fetchingData();
	};

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
	};

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
	};

	const handleChange = (e) => {
		const location = locationData.filter(location => location.city === e.target.value)
		dispatch(setLocation(location[0]))
	};

	const handleClose = () => {
		dispatch(setDialogOpen(false))
	};

	return (
		<Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
			<DialogTitle>選擇縣市</DialogTitle>
			<DialogContent>
				<Select
					fullWidth
					variant="outlined"
					value={location.city}
					onChange={handleChange}
					label="地點"
				>
					{locationData.map(el => (<MenuItem key={el.city} value={el.city}>{el.city}</MenuItem>))}
				</Select>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					取消
            </Button>
				<Button onClick={handleChangeLocation} color="primary">
					確定
        </Button>
			</DialogActions>
		</Dialog>
	);
}

export default LocationDialog;