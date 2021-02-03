import React from 'react';
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { setDialogOpen, setLocation } from '../redux/action';

const mapStateToProps = (state) => ({
	location: state.weatherLocation.location,
	open: state.weatherLocation.dialogOpen
})

const LocationDialog = ({location, open}) => {
	const dispatch = useDispatch();
console.log(location)
	const locationData = [
		{
			city: '臺北市',
			place: '臺北'
		},
		{
			city: '新北市',
			place: '雙溪'
		},
		{
			city: '基隆市',
			place: '基隆'
		},
		{
			city: '桃園市',
			place: '桃園'
		},
		{
			city: '新竹市',
			place: '新竹'
		},
		{
			city: '新竹縣',
			place: '橫山'
		},
		{
			city: '苗栗縣',
			place: '苗栗'
		},
		{
			city: '臺中市',
			place: '臺中'
		},
		{
			city: '彰化縣',
			place: '彰化'
		},
		{
			city: '南投縣',
			place: '南投'
		},
		{
			city: '雲林縣',
			place: '高鐵雲林'
		},
		{
			city: '嘉義市',
			place: '嘉義'
		},
		{
			city: '嘉義縣',
			place: '東石'
		},
		{
			city: '臺南市',
			place: '臺南'
		},
		{
			city: '高雄市',
			place: '高雄'
		},
		{
			city: '屏東縣',
			place: '屏東'
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

	const handleChange = (e) => {
		const location = locationData.filter(location => location.city === e.target.value)
		dispatch(setLocation(location[0]))
	};

	const handleClose = () => {
		dispatch(setDialogOpen(false))
	}

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
					Cancel
            </Button>
				<Button onClick={handleClose} color="primary">
					Ok
        </Button>
			</DialogActions>
		</Dialog>
	);
}

export default connect(
	mapStateToProps
)(LocationDialog);