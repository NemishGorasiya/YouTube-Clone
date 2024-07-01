import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { filterFields } from "../../utils/constant";
import {
	Divider,
	FilterContentWrapper,
	FilterFieldTypography,
	FilterFieldWrapper,
	FilterModal,
	FiltersButton,
	StyledClearFilterIcon,
} from "./VideoFilterStyledComponents";

const VideoFilter = ({ updateQueryParams, queryParams }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = useCallback(() => setIsModalOpen(true), []);
	const closeModal = useCallback(() => setIsModalOpen(false), []);

	const handleFilterChange = useCallback(
		({ filterKey, filterValue }) => {
			const isRemoving = queryParams[filterKey] === filterValue;
			updateQueryParams({ key: filterKey, value: filterValue, isRemoving });
			closeModal();
		},
		[queryParams, updateQueryParams, closeModal]
	);

	return (
		<>
			<FiltersButton onClick={openModal} variant="text" endIcon={<TuneIcon />}>
				Filters
			</FiltersButton>
			<FilterModal open={isModalOpen} handleClose={closeModal}>
				<Typography variant="h6">Search filters</Typography>
				<FilterContentWrapper>
					{filterFields.map((filter) => {
						const { title, filterKey, fields } = filter || {};
						return (
							<FilterFieldWrapper key={title}>
								<Typography variant="body2">{title}</Typography>
								<Divider flexItem />
								{fields.map((field, idx) => {
									const { label, value } = field || {};
									return (
										<FilterFieldTypography
											onClick={() =>
												handleFilterChange({
													filterKey,
													filterValue: value,
												})
											}
											key={idx}
											variant="body2"
											$isApplied={queryParams[filterKey] === value}
										>
											{label}{" "}
											{queryParams[filterKey] === value && (
												<StyledClearFilterIcon />
											)}
										</FilterFieldTypography>
									);
								})}
							</FilterFieldWrapper>
						);
					})}
				</FilterContentWrapper>
			</FilterModal>
		</>
	);
};

VideoFilter.propTypes = {
	updateQueryParams: PropTypes.func,
	queryParams: PropTypes.object,
};

export default VideoFilter;
