import { Box, Divider, Grid, Typography } from "@mui/material"

// reference: https://stackoverflow.com/questions/35814653/automatic-height-when-embedding-a-youtube-video

const VideoPlayer = () => {
  return (
    <Grid container component={Box} sx={{ height: "100%", width: "100%" }}>
      {/* <TextField disabled value={count} /> */}
      <Grid container item justifyContent="center" alignItems="center" xs={12}>
        <Typography variant={"h3"}>
          Absolute Masterclass in Video Embedding {`( ͡° ͜ʖ ͡°)`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid container item justifyContent="center" alignItems="center" xs={12}>
        <iframe
          src="https://www.youtube.com/embed/xNRJwmlRBNU?si=DU5LjI2VL62TAw-f"
          title="Youtube"
          allowFullScreen
          style={{
            width: "100%",
            maxWidth: "75%",
            aspectRatio: "16/9"
          }}
        />
      </Grid>
    </Grid>
  )
}

export default VideoPlayer
