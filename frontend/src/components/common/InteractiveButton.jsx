import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
// import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const InteractiveButton = ({ handleAdd }) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const { sendRequest } = useSelector((state) => state);

  const buttonSx = {
    fontSize: 20,
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const handleButtonClick = () => {
    handleAdd();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 1500);
    }
  };
  // if (sendRequest.success) clearTimeout(timer.current);

  React.useEffect(() => {
    setLoading(sendRequest.loading);
    setSuccess(sendRequest.success);
    return () => {
      clearTimeout(timer.current);
    };
  }, [sendRequest.loading, sendRequest.success]);

  React.useMemo(() => {
    if (sendRequest.success) {
      clearTimeout(timer.current);
    }
  }, [sendRequest]);

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ m: 1, position: "relative" }}>
          <Fab
            aria-label="save"
            color="primary"
            sx={buttonSx}
            onClick={handleButtonClick}
          >
            {/* {success ? <CheckIcon /> : } */}
            <AddIcon />
          </Fab>
          {/* {loading && (
            <CircularProgress
              size={68}
              sx={{
                color: green[500],
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )} */}
        </Box>
      </Box>
    </div>
  );
};

export default InteractiveButton;
