import { useState } from "react";
import PropTypes from "prop-types";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { StyledIconButton } from "./VoiceSearchStyledComponents";

const VoiceSearch = ({ handleSearchQueryChange, searchVideos }) => {
  const [isRecognizing, setIsRecognizing] = useState(false);

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
      setIsRecognizing(true);
    };

    recognition.onspeechend = function () {
      setIsRecognizing(false);
      recognition.stop();
    };

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      handleSearchQueryChange(transcript);
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
  handleSearchQueryChange: PropTypes.func,
  searchVideos: PropTypes.func,
};

export default VoiceSearch;
