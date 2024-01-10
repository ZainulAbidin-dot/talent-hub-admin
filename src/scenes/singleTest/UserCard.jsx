import { useTheme } from "@emotion/react";
import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";

const UserCard = ({
  id,
  title,
  jobseekerId,
  testId,
  score,
  status,
  startedAt,
  completedAt,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

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
          {title}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          Participant Test Id: {id}
        </Typography>

        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Participant User Id: {jobseekerId}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Score: {score}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Status: {status}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Started At: {startedAt}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Completed At: {completedAt}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default UserCard;
