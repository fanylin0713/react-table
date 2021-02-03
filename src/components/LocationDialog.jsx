import React from 'react';
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { setDialogOpen } from '../redux/action';

const mapStateToProps = (state) => ({
	open: state.weatherLocation.dialogOpen
})

const LocationDialog = (open) => {
	const dispatch = useDispatch();
	const [age, setAge] = React.useState('');
	const handleChange = (event) => {
		setAge(Number(event.target.value) || '');
	};

	const handleClose = () => {
		dispatch(setDialogOpen(false))
	}

	return (
		<Dialog disableBackdropClick disableEscapeKeyDown open={open.open} onClose={handleClose}>
			<DialogTitle>選擇縣市</DialogTitle>
			<DialogContent>
				<Select
					labelId="demo-dialog-select-label"
					id="demo-dialog-select"
					value={age}
					onChange={handleChange}
					input={<Input />}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
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