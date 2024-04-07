import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const VideoCard = () => {
	return (
		<Grid item xs={3} sx={{ minWidth: "200px" }}>
			<Card elevation={0}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="200"
						image="https://placehold.jp/150x150.png"
						alt="Video Thumbnail"
						sx={{ borderRadius: "14px" }}
					/>
					<CardContent sx={{ paddingX: 0 }}>
						<Box
							sx={{
								display: "flex",
								gap: "10px",
							}}
						>
							<Box
								component="img"
								sx={{
									height: 50,
									width: 50,
									borderRadius: "50%",
								}}
								alt="Channel Thumbnail"
								src="https://placehold.jp/150x150.png"
							/>
							<Box>
								<Typography
									sx={{
										lineHeight: "1.2",
										textOverflow: "ellipsis",
										WebkitLineClamp: "2",
										overflow: "hidden",
										display: "-webkit-box",
										WebkitBoxOrient: "vertical",
									}}
									gutterBottom
									variant="subtitle1"
									component="h2"
								>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Exercitationem vel nihil voluptas tenetur id sint non illo
									assumenda velit omnis.
								</Typography>
								<Typography variant="body2" color="text.secondary">
									T-Series <CheckCircleIcon />
								</Typography>
								<Typography variant="body2" color="text.secondary">
									3.9 M views • 1 month ago
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

export default VideoCard;
