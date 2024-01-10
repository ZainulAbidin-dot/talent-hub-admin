import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const JobseekerDetailsCard = ({
  id,
  name,
  contactNumber,
  country,
  city,
  education,
  experience,
  resume,
  skills,
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
          Jobseeker Profile Details
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          Jobseeker Id: {id}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Name: {name}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Contact Number: {contactNumber}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Country: {country}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          City: {city}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Experience: {experience}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Education: {education}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          City: {city}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Skills: {skills.join(", ")}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          <a
            style={{
              color: "white",
              border: "1px solid white",
              borderRadius: "4px",
              padding: "5px",
              textDecoration: "none",
            }}
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume Link
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobseekerDetailsCard;
