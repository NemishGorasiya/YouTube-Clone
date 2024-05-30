import { IconButton, styled } from "@mui/material";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { useState } from "react";
import PropTypes from "prop-types";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.background.light,
}));

const VoiceSearch = ({ handleChangeInSearchQuery, searchVideos }) => {
  const [isRecognizing, setIsRecognizing] = useState(false);

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onstart = function () {
      setIsRecognizing(true);
      console.log("We are listening. Try speaking into the microphone.");
    };
    recognition.onspeechend = function () {
      // when user is done speaking
      setIsRecognizing(false);
      recognition.stop();
    };
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      console.log("transcript", transcript);
      handleChangeInSearchQuery(transcript);
      searchVideos(transcript);
    };
    recognition.start();
  };
  return (
    <StyledIconButton
      aria-label="voice search"
      onClick={startSpeechRecognition}
    >
      {isRecognizing ? (
        <GraphicEqIcon fontSize="small" />
      ) : (
        <KeyboardVoiceIcon fontSize="small" />
      )}
    </StyledIconButton>
  );
};

VoiceSearch.propTypes = {
  handleChangeInSearchQuery: PropTypes.func,
  searchVideos: PropTypes.func,
};

export default VoiceSearch;
