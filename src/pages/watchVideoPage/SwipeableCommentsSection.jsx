import { Box, Button, Typography } from "@mui/material";

import React from "react";
import PropTypes from "prop-types";
import { formatCompactNumber } from "../../utils/utilityFunction";
import {
	Puller,
	StyledBox,
	SwipeableDrawer,
} from "./SwipeableCommentsSectionStyledComponents";

const drawerBleeding = 0;

const SwipeableCommentsSection = ({ children, commentCount }) => {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	return (
		<>
			<Box sx={{ p: 1, background: "grey", borderRadius: 2, mt: 2 }}>
				<h1>{formatCompactNumber(commentCount)} Comments</h1>
				<Button onClick={toggleDrawer(true)}>View comments</Button>
			</Box>
			<SwipeableDrawer
				anchor="bottom"
				open={open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				swipeAreaWidth={drawerBleeding}
				disableSwipeToOpen={false}
				ModalProps={{
					keepMounted: true,
				}}
			>
				<StyledBox
					sx={{
						position: "absolute",
						top: -drawerBleeding,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						visibility: "visible",
						right: 0,
						left: 0,
					}}
				>
					<Puller />
					<Typography
						variant="h4"
						component={"h1"}
						sx={{ p: 1, color: "#fff", fontWeight: "700" }}
					>
						Comments
					</Typography>
				</StyledBox>
				<StyledBox
					sx={{
						px: 2,
						p: 2,
						height: "100%",
						overflow: "auto",
					}}
				>
					{children}
				</StyledBox>
			</SwipeableDrawer>
		</>
	);
};

SwipeableCommentsSection.propTypes = {
	children: PropTypes.node,
	commentCount: PropTypes.string,
};

export default SwipeableCommentsSection;
