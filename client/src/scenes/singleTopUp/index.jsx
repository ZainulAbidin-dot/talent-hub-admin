import React, { useEffect, useState } from "react";
import { useGetSingleCustomerQuery } from "state/api";
import {
  Box,
  useTheme,
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  FormControlLabel,
  Switch,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Header from "components/Header";
import profileImage from "assets/profile.jpg";
import { useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";

const SingleCustomer = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { data, isLoading } = useGetSingleCustomerQuery(state.customerId);

  const [formData, setFormData] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const [isVerified, setIsVerified] = useState([
    {
      id: 1,
      name: "Profile Picture",
      image: formData != null ? formData.profilePic : profileImage,
      isCorrect: false,
      remarks: "",
    },
    {
      id: 2,
      name: "CNIC Front Picture",
      image:
        formData != null && formData.driverProfile
          ? formData.driverProfile.cnicFrontPic
          : profileImage,
      isCorrect: false,
      remarks: "",
    },
    {
      id: 3,
      name: "CNIC Back Picture",
      image:
        formData != null && formData.driverProfile
          ? formData.driverProfile.cnicBackPic
          : profileImage,
      isCorrect: false,
      remarks: "",
    },
    {
      id: 4,
      name: "License Plate Number",
      image:
        formData != null && formData.driverProfile
          ? formData.driverProfile.licensePic
          : profileImage,
      isCorrect: false,
      remarks: "",
    },
    {
      id: 5,
      name: "Assign Admin Role",
      image: formData != null ? formData.profilePic : profileImage,
      isCorrect: false,
      remarks: "",
    },
  ]);

  const rows = [
    {
      id: 1,
      name: "Profile Picture",
      image: formData != null ? formData.profilePic : profileImage,
    },
    {
      id: 2,
      name: "CNIC Front Picture",
      image:
        formData != null && formData.driverProfile
          ? formData.driverProfile.cnicFrontPic
          : profileImage,
    },
    {
      id: 3,
      name: "CNIC Back Picture",
      image:
        formData != null && formData.driverProfile
          ? formData.driverProfile.cnicBackPic
          : profileImage,
    },
    {
      id: 4,
      name: "License Plate Number",
      image:
        formData != null && formData.driverProfile
          ? formData.driverProfile.licensePic
          : profileImage,
    },
    {
      id: 5,
      name: "Assign Admin Role",
      image: formData != null ? formData.profilePic : profileImage,
    },
  ];

  const [toggleBtn, setToggleBtn] = useState(Array(rows.length).fill(false));

  const columns = [
    {
      field: "name",
      headerName: "Picture Name",
      width: 250,
    },
    {
      field: "picture",
      headerName: "Picture",
      width: 150,
      renderCell: (params) => (
        <Card>
          <CardMedia
            component="img"
            style={{
              height: 40, // Adjust the size as needed
              width: 40,
              cursor: "pointer",
            }}
            onClick={() => {
              setModalImage(params.row.image || profileImage);
              setOpenModal(true);
            }}
            image={
              params.row.name === "Assign Admin Role"
                ? profileImage
                : params.row.image || profileImage
            }
            title="User Image"
          />
        </Card>
      ),
    },
    {
      field: "toggleSwitch",
      headerName: "Is Verified",
      width: 150,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Switch
              checked={toggleBtn[params.id - 1]}
              onChange={() => handleToggleSwitch(params)}
              color="warning"
            />
          }
        />
      ),
    },
    {
      field: "inputField",
      headerName: "Remarks",
      width: 250,
      renderCell: (params) => (
        <TextField
          id={`inputField-${params.id}`}
          label={params.row.name + " Remark"}
          variant="outlined"
          size="small"
          fullWidth
          // You can handle the input change with onChange prop
          onChange={(e) => handleRemarks(params, e.target.value)}
        />
      ),
    },
  ];

  useEffect(() => {
    if (!isLoading && data != null && data !== undefined) {
      setFormData({
        name: data.data.user.fullName,
        email: data.data.user.email,
        phoneNumber: data.data.user.phoneNumber,
        role: data.data.user.roles.join(", "),
        profilePic: data.data.user.profilePic,
        gender: data.data.user.gender === "F" ? "Female" : "Male",
        wallet: data.data.user.wallet.balance + " Rupees",
        paymentMethods: data.data.user.paymentMethods.join(", "),
        driverProfile: data.data.user.driverProfile,
        passengerProfile: data.data.user.passengerProfile,
      });

      console.log(data);
      if (data?.data?.user?.driverProfile?.vehicles.length > 0) {
        data?.data?.user?.driverProfile?.vehicles?.forEach((vehicle, index) => {
          rows.push({
            id: index + 6,
            name: "Vehicle " + (index + 1) + " Registration Picture",
            image: vehicle.vehicleRegistrationPic,
          });
        });
      }
    }
  }, [isLoading, data]);

  const handleToggleSwitch = (params, value = 0) => {
    setToggleBtn((prevToggleBtns) => {
      const newToggleBtns = [...prevToggleBtns];
      newToggleBtns[params.id - 1] = !newToggleBtns[params.id - 1];
      return newToggleBtns;
    });

    setIsVerified((prevIsVerified) => {
      return prevIsVerified.map((item) => {
        if (item.id === params.id) {
          return {
            id: item.id,
            name: item.name,
            isCorrect: value === 0 ? true : false,
            image: item.image,
            remarks: item.remarks,
          };
        }
        return item;
      });
    });
  };

  const handleRemarks = (params, value) => {
    setIsVerified((prevIsVerified) => {
      return prevIsVerified.map((item) => {
        if (item.id === params.id) {
          return {
            id: item.id,
            name: item.name,
            isCorrect: item.isCorrect,
            image: item.image,
            remarks: value,
          };
        }
        return item;
      });
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    // Handle form submission here, e.g., update data in the backend
    console.log("Form submitted with data:", isVerified);
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
                      PHONE NUMBER : {formData.phoneNumber}
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
                    <Typography variant="body2" color="text.secondary">
                      WALLET BALANCE : {formData.wallet}
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
                          User Id: {formData.passengerProfile.userId}
                        </Typography>
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
                          User Id : {formData.driverProfile.userId}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          CNIC : {formData.driverProfile.cnicNumber}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Is Verified :{" "}
                          {formData.driverProfile.isVerified ? "True" : "False"}
                        </Typography>
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
                                    Category :{" "}
                                    {vehicle.categories.map(
                                      (category) => category.name + " "
                                    )}
                                  </Typography>
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

            {formData.driverProfile && (
              <>
                <Box
                  sx={{
                    height: 400,
                    width: "70vw",
                    margin: "0 auto",
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    width: "70vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1rem",
                    marginBottom: "10rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  color="primary"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
                <Header
                  style={{ marginBottom: "20px" }}
                  // title="Marker Info"
                  subtitle="Click the Save Button to save the changes."
                />
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SingleCustomer;
