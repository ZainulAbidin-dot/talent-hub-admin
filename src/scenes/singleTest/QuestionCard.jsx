import { useTheme } from "@emotion/react";
import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";

const QuestionCard = ({ id, question, sequenceNumber }) => {
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
          Question - {sequenceNumber}
        </Typography>

        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          Question Id: {id}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Question: {question}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default QuestionCard;
