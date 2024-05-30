import { Box, Button, Typography, styled } from "@mui/material";
import MuiDivider from "@mui/material/Divider";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import StyledModal from "../../components/StyledModal";
import { filterFields } from "../../utils/constant";

const FiltersButton = styled(Button)(() => ({
	"&:hover": {
		background: "rgba(255, 255, 255, 0.2)",
	},
}));
const FilterFieldWrapper = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	textAlign: "start",
	gap: "8px",
}));
const FilterContentWrapper = styled(Box)(() => ({
	display: "flex",
	gap: "16px",
}));

const Divider = styled(MuiDivider)(() => ({
	borderBottomWidth: "2px",
}));
const FilterFieldTypography = styled(Typography)(() => ({
	color: "grey",
	cursor: "pointer",
}));

const VideoFilter = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [filters, setFilters] = useState({});

	const handleFilterFieldClick = ({ filterKey, filterValue }) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterKey]: filterValue,
		}));
	};

	console.log(filters, "filters");

	return (
		<>
			<FiltersButton onClick={handleOpen} variant="text" endIcon={<TuneIcon />}>
				Filters
			</FiltersButton>
			<StyledModal open={open} handleClose={handleClose}>
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
										})
									}
									key={idx}
									variant="body2"
								>
									{field.label}
								</FilterFieldTypography>
							))}
						</FilterFieldWrapper>
					))}
				</FilterContentWrapper>
			</StyledModal>
		</>
	);
};

export default VideoFilter;
