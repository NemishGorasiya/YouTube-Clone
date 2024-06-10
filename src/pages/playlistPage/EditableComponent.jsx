import { useState } from "react";
import { httpRequest } from "../../services/services";
import PropTypes from "prop-types";
import { Button, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import toast from "react-hot-toast";
import {
  EditableContentWrapper,
  TextField,
  UserActionButtonsWrapper,
} from "./EditableComponentStyledComponents";

const EditableComponent = ({
  currentValue,
  playlistId,
  updatePlaylistTitle,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newValue, setNewValue] = useState(currentValue);

  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  const handleCancelButtonClick = () => {
    setIsEditMode(false);
    setNewValue(currentValue);
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
        data,
        returnEntireResponseWithStatusCode: true,
      });
      if (res.status === 400) {
        toast.error("This playlist cannot be edited");
      } else if (res.status === 204) {
        toast("Playlist title updated successfully");
        setIsEditMode(false);
        updatePlaylistTitle(newValue);
      }
    } catch (error) {
      setNewValue(currentValue);
      console.error(error);
    }
  };

  return (
    <EditableContentWrapper $isEditMode={isEditMode}>
      {isEditMode ? (
        <>
          <TextField
            required={true}
            variant="standard"
            value={newValue}
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
          <h1>{newValue}</h1>
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
  updatePlaylistTitle: PropTypes.func,
};

export default EditableComponent;
