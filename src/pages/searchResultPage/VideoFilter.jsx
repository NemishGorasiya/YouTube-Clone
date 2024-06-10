import { useState } from "react";
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
                        handleFilterFieldClick({
                          filterKey: filterKey,
                          filterValue: value,
                          isClearingFilter: queryParams[filterKey] === value,
                        })
                      }
                      key={idx}
                      variant="body2"
                      $textColor={
                        queryParams[filterKey] === value ? "#fff" : null
                      }
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
