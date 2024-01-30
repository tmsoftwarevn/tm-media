import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";

import SpeedDialAction from "@mui/material/SpeedDialAction";

import call from "../../assets/icon contact/png-clipart-blue-call-icon-dialer-android-google-play-telephone-phone-blue-text.png";
import mess from "../../assets/icon contact/mess.webp";
const handleClick = (e, operation) => {
  e.preventDefault();
  if (operation == "Facebook") {
    window.open(process.env.REACT_APP_URL_MESSENGER, "_blank");
  }
  if (operation == "phone") {
    window.open("tel:" + process.env.REACT_APP_PHONE, "_blank");
  }
  if (operation == "zalo") {
    window.open(`${process.env.REACT_APP_URL_ZALO}`, "_blank");
    
  }
};
const actions = [
  {
    icon: <img src="https://page.widget.zalo.me/static/images/2.0/Logo.svg" />,
    name: "Zalo",
    operation: "zalo",
  },
  {
    icon: <img src={mess} />,
    name: "Facebook",
    action: handleClick,
    operation: "Facebook",
  },
  {
    icon: <img src={call} style={{ borderRadius: "50%" }} />,
    name: "Gọi ngay",
    operation: "phone",
  },
];

export default function BasicSpeedDial() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<img src={call} style={{ borderRadius: "50%" }} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(e) => {
              handleClick(e, action.operation);
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
