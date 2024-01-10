import { useTheme } from "@emotion/react";
import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";

const DetailsCard = ({ id, name, skills, startedAt, endedAt }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        maxWidth: 545,
        minWidth: 545,
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 28 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          Job Details
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          Job Id: {id}
        </Typography>

        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Job Name: {name}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Skills: {skills}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Starting Date: {startedAt}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Ending Date: {endedAt}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default DetailsCard;
