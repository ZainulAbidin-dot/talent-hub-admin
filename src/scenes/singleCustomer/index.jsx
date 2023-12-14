import React, { useEffect, useState } from "react";
import {
  useGetAllDocumentsByUserIdQuery,
  useGetSingleCustomerQuery,
} from "state/api";
import {
  Box,
  useTheme,
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  MenuItem,
  Stack,
  Menu,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Header from "components/Header";
import profileImage from "assets/profile.jpg";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";
import Documents from './Documents';

const SingleCustomer = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCustomerQuery(id);
  const [formData, setFormData] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [driverProfileStatus, setDriverProfileStatus] = useState(false);
  const [updatedDriverProfileStatus, setUpdatedDriverProfileStatus] =
    useState(null);
  const [passengerProfileStatus, setPassengerProfileStatus] = useState(false);
  const [updatedPassengerProfileStatus, setUpdatedPassengerProfileStatus] =
    useState(null);

  const statusType = [
    {
      value: "underReview",
      label: "Under Review",
    },
    {
      value: "active",
      label: "Active",
    },
    {
      value: "suspended",
      label: "Suspended",
    },
  ];

  const accessToken = useSelector((state) => state.global.authToken);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!isLoading && data != null && data !== undefined) {
      setFormData({
        name: data.data.user.data.fullName,
        email: data.data.user.data.email,
        phoneNumber: data.data.user.data.phoneNumber,
        role: data.data.user.data.roles.join(", "),
        profilePic: data.data.user.data.profilePic,
        gender: data.data.user.data.gender === "F" ? "Female" : "Male",
        driverProfile: data.data.user.data.driverProfile,
        passengerProfile: data.data.user.data.passengerProfile,
        cnicNumber: data.data.user.data.cnicNumber,
      });
    }
  }, [isLoading, data]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdatedStatusSubmit = async (e) => {
    e.preventDefault();
    console.log(updatedDriverProfileStatus, updatedPassengerProfileStatus);

    if (updatedDriverProfileStatus != null) {
      try {
        const response = await axios.patch(
          `${localStorage.getItem("baseUrl")}admin/driver-profiles/status`,
          {
            driverProfileId: formData.driverProfile.id,
            status: updatedDriverProfileStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        alert(response.data.message);
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
    }

    if (updatedPassengerProfileStatus != null) {
      try {
        const response = await axios.patch(
          `${localStorage.getItem("baseUrl")}admin/passenger-profiles/status`,
          {
            passengerProfileId: formData.passengerProfile.id,
            status: updatedPassengerProfileStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        alert(response.data.message);
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
    }

    window.location.reload();
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMER" subtitle="Details of Customer" />
      <Box
        mt="40px"
        height="80vh"
        display="block"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        {formData == null || isLoading ? (
          "Loading..."
        ) : (
          <>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              {formData.profilePic ? (
                <Card
                  variant="outlined"
                  style={{
                    height: "50vh",
                    backgroundColor: "transparent",
                    width: "70vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0",
                    position: "relative", // Added to position the overlay properly
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                      Profile Picture
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    style={{
                      height: hovered ? 200 : 140, // Adjust the size as needed
                      width: hovered ? 200 : 140,
                      transition: "all 0.3s", // Add smooth transition
                      borderRadius: "50%", // To make it a circular image
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setModalImage(formData.profilePic || profileImage);
                      setOpenModal(true);
                    }}
                    image={formData.profilePic || profileImage}
                    title="User Image"
                  />
                </Card>
              ) : null}

              {formData.name ? (
                <Card
                  variant="outlined"
                  style={{
                    // height: "50vh",
                    backgroundColor: "transparent",
                    width: "70vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h3"
                      paddingTop={3}
                      component="div"
                    >
                      User Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      NAME : {formData.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      CNIC : {formData.cnicNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      EMAIL : {formData.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ROLE : {formData.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      GENDER : {formData.gender}
                    </Typography>

                    {formData.passengerProfile ? (
                      <>
                        <Typography
                          gutterBottom
                          variant="h3"
                          paddingTop={2}
                          component="div"
                        >
                          Passenger Profile Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          User Id: {formData.passengerProfile.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Is Verified: {formData.passengerProfile.status}
                        </Typography>

                        <Button
                          variant="outlined"
                          color="secondary"
                          type="submit"
                          sx={{ mt: "1rem" }}
                          onClick={() =>
                            setPassengerProfileStatus((prev) =>
                              prev === false ? true : false
                            )
                          }
                        >
                          Update Status
                        </Button>

                        {passengerProfileStatus === true && (
                          <Box>
                            <React.Fragment>
                              <h2>Update Status</h2>
                              <form
                                onSubmit={(e) => handleUpdatedStatusSubmit(e)}
                              >
                                <Stack
                                  spacing={2}
                                  direction="row"
                                  sx={{ marginBottom: 4 }}
                                >
                                  <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Type"
                                    defaultValue={
                                      formData.passengerProfile.status
                                    }
                                    sx={{ mb: 4, mr: 2 }}
                                    onChange={(e) =>
                                      setUpdatedPassengerProfileStatus(
                                        e.target.value
                                      )
                                    }
                                  >
                                    {statusType.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Stack>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  type="submit"
                                >
                                  Submit
                                </Button>
                              </form>
                              <small>
                                {/* Already have an account? <Link to="/login">Login Here</Link> */}
                              </small>
                            </React.Fragment>
                          </Box>
                        )}
                      </>
                    ) : null}

                    {formData.driverProfile ? (
                      <>
                        <Typography
                          gutterBottom
                          variant="h3"
                          paddingTop={3}
                          component="div"
                        >
                          Driver Profile Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          User Id : {formData.driverProfile.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Is Verified : {formData.driverProfile.status}
                        </Typography>

                        <Button
                          variant="outlined"
                          color="secondary"
                          type="submit"
                          sx={{ mt: "1rem" }}
                          onClick={() =>
                            setDriverProfileStatus((prev) =>
                              prev === false ? true : false
                            )
                          }
                        >
                          Update Status
                        </Button>

                        {driverProfileStatus === true && (
                          <Box>
                            <React.Fragment>
                              <h2>Update Status</h2>
                              <form
                                onSubmit={(e) => handleUpdatedStatusSubmit(e)}
                              >
                                <Stack
                                  spacing={2}
                                  direction="row"
                                  sx={{ marginBottom: 4 }}
                                >
                                  <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Type"
                                    defaultValue={formData.driverProfile.status}
                                    sx={{ mb: 4, mr: 2 }}
                                    onChange={(e) =>
                                      setUpdatedDriverProfileStatus(
                                        e.target.value
                                      )
                                    }
                                  >
                                    {statusType.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Stack>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  type="submit"
                                >
                                  Submit
                                </Button>
                              </form>
                              <small>
                                {/* Already have an account? <Link to="/login">Login Here</Link> */}
                              </small>
                            </React.Fragment>
                          </Box>
                        )}

                        <Typography
                          gutterBottom
                          variant="h3"
                          paddingTop={3}
                          component="div"
                        >
                          Vehicles Details
                        </Typography>

                        {formData.driverProfile.vehicles
                          ? formData.driverProfile.vehicles.map(
                            (vehicle, index) => (
                              <Card
                                variant="outlined"
                                style={{
                                  height: "50vh",
                                  backgroundColor: "transparent",
                                  width: "20vw",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  margin: "0 auto",
                                }}
                              >
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                >
                                  Current Selected Vehicle :{" "}
                                  {vehicle.selected ? "True" : "False"}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                ></Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Color : {vehicle.color}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Model : {vehicle.model}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Year : {vehicle.year}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  No of Seats : {vehicle.noOfSeats}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Engine Capacity: {vehicle.engineCapacity}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Is AC Available :{" "}
                                  {vehicle.isAcAvailable ? "True" : "False"}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Is Trunk Available :{" "}
                                  {vehicle.isTrunkAvailable}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  License Plate Number :{" "}
                                  {vehicle.licensePlateNumber}
                                </Typography>
                              </Card>
                            )
                          )
                          : null}
                      </>
                    ) : null}
                  </CardContent>
                </Card>
              ) : null}
            </Box>

            <Dialog open={openModal} onClose={handleCloseModal}>
              <DialogTitle>Zoomed Image</DialogTitle>
              <DialogContent>
                <img
                  src={modalImage}
                  alt="Zoomed"
                  style={{ width: 500, height: 500 }}
                />
              </DialogContent>
            </Dialog>
          </>
        )}

        <Documents />
      </Box>
    </Box>
  );
};

export default SingleCustomer;
