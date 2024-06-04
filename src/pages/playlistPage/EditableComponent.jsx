import { Button, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { httpRequest } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import PropTypes from "prop-types";
import {
  EditableContentWrapper,
  TextField,
  UserActionButtonsWrapper,
} from "./EditableComponentStyledComponents";

const EditableComponent = ({ currentValue, playlistId }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newValue, setNewValue] = useState(currentValue);
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };
  const handleCancelButtonClick = () => {
    setIsEditMode(false);
  };
  const handleInputChange = ({ target: { value } }) => {
    setNewValue(value);
  };
  const handleUpdateValue = async () => {
    if (newValue === currentValue) {
      return;
    }
    try {
      const queryParams = {
        part: "snippet",
      };
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const data = {
        id: playlistId,
        snippet: {
          title: newValue,
        },
      };

      const res = await httpRequest({
        url: "/playlists",
        method: "PUT",
        queryParams,
        headers,
        data,
      });

      if (res) {
        console.log("title updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <EditableContentWrapper isEditMode={isEditMode}>
      {isEditMode ? (
        <>
          <TextField
            required={true}
            variant="standard"
            defaultValue={currentValue}
            onChange={handleInputChange}
            error={newValue === ""}
            helperText={newValue === "" ? "required" : ""}
          />
          <UserActionButtonsWrapper>
            <Button onClick={handleCancelButtonClick}>Cancel</Button>
            <Button onClick={handleUpdateValue}>Save</Button>
          </UserActionButtonsWrapper>
        </>
      ) : (
        <>
          <h1>{currentValue}</h1>
          <IconButton onClick={handleEditButtonClick}>
            <EditOutlinedIcon />
          </IconButton>
        </>
      )}
    </EditableContentWrapper>
  );
};

EditableComponent.propTypes = {
  playlistId: PropTypes.string,
  currentValue: PropTypes.string,
};

export default EditableComponent;
