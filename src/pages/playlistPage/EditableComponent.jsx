import { Button, IconButton, styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiTextField from "@mui/material/TextField";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { fetchData } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import { PlaylistAddOutlined } from "@mui/icons-material";

const EditableContentWrapper = styled(MuiBox)(({ isEditMode }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  ...(isEditMode
    ? {
        flexDirection: "column",
      }
    : {}),
}));

const UserActionButtonsWrapper = styled(MuiBox)(() => ({
  textAlign: "end",
  width: "100%",
}));

const TextField = styled(MuiTextField)(() => ({
  width: "100%",
  "& .MuiInputBase-input": {
    fontSize: 32,
    fontWeight: 700,
  },
}));

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
    console.log("calllelelelelle");
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

      const res = await fetchData({
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

export default EditableComponent;
