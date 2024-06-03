import { Box, Button, Typography, styled } from "@mui/material";
import MuiDivider from "@mui/material/Divider";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import StyledModal from "../../components/StyledModal";
import { filterFields } from "../../utils/constant";
import ClearIcon from "@mui/icons-material/Clear";

const FiltersButton = styled(Button)(() => ({
	padding: "8px 16px",
	"&:hover": {
		background: "rgba(255, 255, 255, 0.2)",
	},
}));
const FilterFieldWrapper = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	textAlign: "start",
	gap: "16px",
	flex: "1 1 auto",
}));
const FilterContentWrapper = styled(Box)(() => ({
	display: "flex",
	gap: "16px",
	paddingTop: "16px",
	paddingRight: "16px",
	flexWrap: "wrap",
	overflow: "auto",
	maxHeight: "80vh",
	"&::-webkit-scrollbar": {
		width: "8px",
		backgroundColor: "transparent",
	},
	"&::-webkit-scrollbar-track": {
		boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
		borderRadius: "10px",
		backgroundColor: "transparent",
	},
	"&::-webkit-scrollbar-thumb": {
		borderRadius: "10px",
		boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
		backgroundColor: "#555",
	},
}));

const Divider = styled(MuiDivider)(() => ({
	borderBottomWidth: "2px",
}));
const FilterFieldTypography = styled(Typography)(({ textColor }) => ({
	color: textColor || "grey",
	cursor: "pointer",
	display: "flex",
	alignItems: "center",
	gap: "8px",
}));

const FilterModal = styled(StyledModal)(() => ({
	minHeight: "200vh",
}));

const StyledClearFilterIcon = styled(ClearIcon)(() => ({
	fontSize: "16px",
}));

const VideoFilter = ({ updateQueryParams, queryParams }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleFilterFieldClick = ({
		filterKey,
		filterValue,
		isClearingFilter,
	}) => {
		updateQueryParams({
			key: filterKey,
			value: filterValue,
			isRemoving: isClearingFilter,
		});
		setOpen(false);
	};

	return (
		<>
			<FiltersButton onClick={handleOpen} variant="text" endIcon={<TuneIcon />}>
				Filters
			</FiltersButton>
			<FilterModal open={open} handleClose={handleClose}>
				<FilterContentWrapper>
					{filterFields.map((filter) => (
						<FilterFieldWrapper key={filter.title}>
							<Typography variant="body2">{filter.title}</Typography>
							<Divider flexItem />
							{filter.fields.map((field, idx) => (
								<FilterFieldTypography
									onClick={() =>
										handleFilterFieldClick({
											filterKey: filter.filterKey,
											filterValue: field.value,
											isClearingFilter:
												queryParams[filter.filterKey] === field.value,
										})
									}
									key={idx}
									variant="body2"
									textColor={
										queryParams[filter.filterKey] === field.value
											? "#fff"
											: null
									}
								>
									{field.label}{" "}
									{queryParams[filter.filterKey] === field.value && (
										<StyledClearFilterIcon />
									)}
								</FilterFieldTypography>
							))}
						</FilterFieldWrapper>
					))}
				</FilterContentWrapper>
			</FilterModal>
		</>
	);
};

export default VideoFilter;
