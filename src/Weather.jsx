import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as Sun } from './images/sun.svg';

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
	svg: {
		width: '150px',
		height: 'auto',
		margin: '40px 27% 50px 27%'
	},
	weatherInformation: {
		padding: '10px 15px 10px 15px',
		margin:'10px 0 0 0'
	}
});

const useStyles = makeStyles(styles);

const Weather = () => {
	const classes = useStyles();

	React.useEffect(() => {
		fetch('/v1/rest/datastore/O-A0003-001?Authorization=CWB-330FC854-CB5C-4364-AE2C-600F34DCF8AE&locationName=板橋', {
			method: "GET",
			mode: 'cors',
			contentType: 'application/json',
			headers: new Headers({
				'Access-Control-Allow-Origin': '*',
				"X-Requested-With": "XMLHttpRequest"
			})
		})
			.then(res => { console.log(res) })
	}, []);


	return (
		<Paper className={classes.paper}>
			<Box className={classes.container} >
				<Typography align='center' variant='h6'>台北市</Typography>
				<Sun className={classes.svg} />
				<Paper className={classes.weatherInformation}>
					<Typography variant='body1'>星期日</Typography>
					<Typography variant='body1'>Sunny</Typography>
					<Typography align='center' variant='h3'>13</Typography>
					<Typography align='center' variant='body2'>12~16</Typography>
					<Typography align='right' variant='body2'>wind:strong</Typography>
					<Typography align='right' variant='body2'>rain:many</Typography>
				</Paper>
			</Box>
		</Paper>
	)
};

export default Weather;