import { useTheme } from "@emotion/react";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const TestDetailsCard = ({
  id,
  companyId,
  name,
  skills,
  startedAt,
  endedAt,
  testNumber,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 545,
        minWidth: 545,
        marginTop: "1.5rem",
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
          Test Details - {testNumber}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          Id: {id}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Company Id: {companyId}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Test Name: {name}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Skills: {skills.join(", ")}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Test Starting Time: {startedAt}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Test Ending Time: {endedAt}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TestDetailsCard;
