import { Box, Button, Grid, Typography } from "@mui/material"

const VideoPlayer = () => {
	return (
		<Grid container component={Box} sx={{ height: "100%", width: "100%" }}>
			{/* <TextField disabled value={count} /> */}
			<Grid container item justifyContent="center" alignItems="center" xs={12}>
				<Typography>Video!</Typography>
			</Grid>
			<Grid container item justifyContent="center" alignItems="center" xs={12}>
				<iframe
					src="https://www.youtube.com/embed/xNRJwmlRBNU?si=DU5LjI2VL62TAw-f"
					title="Youtube"
					allowFullScreen
					style={{ width: "100%", height: "100%" }}></iframe>
			</Grid>
		</Grid>
		// <Box>
		// 	<div>Video!</div>
		// 	<div>

		// 	</div>
		// </Box>
	)
}

export default VideoPlayer
