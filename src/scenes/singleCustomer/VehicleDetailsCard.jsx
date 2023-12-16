import { useTheme } from "@emotion/react";
import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";

const VehicleDetailsCard = ({
  id,
  isSelected,
  color,
  model,
  year,
  noOfSeats,
  engineCapacity,
  isAcAvailable,
  isTrunkAvailable,
  licensePlateNumber,
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
          Vehicles Details
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          {id}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Is the Selected Vehicle: {isSelected ? "Yes" : "No"}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Color: {color}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Year: {year}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Model: {model}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Number of Seats: {noOfSeats}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Engine Capacity: {engineCapacity}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Is the AC Available: {isAcAvailable}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Is the Trunk Available: {isTrunkAvailable}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          License Plate Number: {licensePlateNumber}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VehicleDetailsCard;
