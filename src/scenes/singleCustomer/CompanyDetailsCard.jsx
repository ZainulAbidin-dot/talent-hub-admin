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

const CompanyDetailsCard = ({
  id,
  name,
  description,
  contactNumber,
  country,
  city,
  size,
  verified,
  logo,
  coverImage,
  instagramUrl,
  facebookUrl,
  linkedInUrl,
  twitterUrl,
  website,
  foundedYear,
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
          Company Profile Details
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          Company Profile Id: {id}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Name: {name}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Description: {description}
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
          Size: {size}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Verified: {verified}
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Founded Year: {foundedYear}
        </Typography>
        <Typography
          sx={{
            mt: "1.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "1.5rem",
          }}
          color={theme.palette.secondary[400]}
        >
          <a
            style={{
              color: "white",
              border: "1px solid white",
              borderRadius: "4px",
              padding: "5px",
              textDecoration: "none",
            }}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram Url
          </a>
          <a
            style={{
              color: "white",
              border: "1px solid white",
              borderRadius: "4px",
              padding: "5px",
              textDecoration: "none",
            }}
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Url
          </a>
          <a
            style={{
              color: "white",
              border: "1px solid white",
              borderRadius: "4px",
              padding: "5px",
              textDecoration: "none",
            }}
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook Url
          </a>
          <a
            style={{
              color: "white",
              border: "1px solid white",
              borderRadius: "4px",
              padding: "5px",
              textDecoration: "none",
            }}
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter Url
          </a>
          <a
            style={{
              color: "white",
              border: "1px solid white",
              borderRadius: "4px",
              padding: "5px",
              textDecoration: "none",
            }}
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website Url
          </a>
        </Typography>

        {/* <React.Fragment>
          <h2>Update Status</h2>
          <form onSubmit={(e) => handleUpdatedStatusSubmit(e)}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Type"
                defaultValue={status}
                sx={{ mb: 4, mr: 2 }}
                onChange={(e) =>
                  setUpdatedPassengerProfileStatus(e.target.value)
                }
              >
                {statusType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Button variant="outlined" color="secondary" type="submit">
              Submit
            </Button>
          </form>
        </React.Fragment> */}
      </CardContent>
    </Card>
  );
};

export default CompanyDetailsCard;
