import { Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import { filterFields } from "../../utils/constant";
import PropTypes from "prop-types";
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

VideoFilter.propTypes = {
  updateQueryParams: PropTypes.func,
  queryParams: PropTypes.object,
};

export default VideoFilter;
