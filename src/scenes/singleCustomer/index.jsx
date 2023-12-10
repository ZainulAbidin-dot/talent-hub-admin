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

  const {
    data: documents,
    isLoading: isDocumentsLoading,
    isError: isDocumentsError,
    error: documentsError,
  } = useGetAllDocumentsByUserIdQuery(id);

  if (isDocumentsLoading === false && isDocumentsError === true) {
    console.log("documentsError", documentsError);
  }

  let formattedDocs = [];

  if (isDocumentsLoading === false && isDocumentsError === false) {
    const profileDocuments = documents.data.documents.map((item) => {
      return {
        id: item.id,
        name: item.name,
        isCorrect: item.status,
        image: item.url,
        remarks: item.status === "approved" ? "No Remarks" : item.remarks,
      };
    });

    let vehicleDocuments = [];
    documents.data.vehicles.forEach((item) => {
      item.documents.forEach((doc) => {
        vehicleDocuments = [
          ...vehicleDocuments,
          {
            id: doc.id,
            name: doc.name,
            isCorrect: doc.status,
            image: doc.url,
            remarks: doc.status === "approved" ? "No Remarks" : doc.remarks,
          },
        ];
      });
    });

    formattedDocs = [...profileDocuments, ...vehicleDocuments];
  }

  // console.log(formattedDocs);
  const rows = formattedDocs || [];

  console.log("formattedDocs", formattedDocs);
  const [isVerified, setIsVerified] = useState(rows);

  const [toggleBtn, setToggleBtn] = useState(Array(rows.length).fill(false));
  const accessToken = useSelector((state) => state.global.authToken);

  const columns = [
    {
      field: "name",
      headerName: "Picture Name",
      width: 250,
    },
    {
      field: "picture",
      headerName: "Picture",
      width: 250,
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
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params) => (
        <TextField
          id={`inputField-${params.id}`}
          label={params.row.isCorrect}
          variant="outlined"
          size="small"
          fullWidth
          required
          // You can handle the input change with onChange prop
          onChange={(e) => handleSelect(params, e.target.value)}
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
          label={params.row.remarks + " Remark"}
          variant="outlined"
          size="small"
          fullWidth
          required
          // You can handle the input change with onChange prop
          onChange={(e) => handleRemarks(params, e.target.value)}
        />
      ),
    },
  ];

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

  const handleSelect = (params, value) => {
    setIsVerified((prevIsVerified) => {
      return prevIsVerified.map((item) => {
        if (item.id === params.id) {
          return {
            id: item.id,
            name: item.name,
            isCorrect: value,
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

  const handleSubmit = async () => {
    // Update data in the backend

    console.log(isVerified);
    try {
      outerLoop: for (const item of isVerified) {
        console.log(item);
        if (
          (!item.isCorrect !== "approved" && item.remarks === "") ||
          (!item.isCorrect !== "approved" &&
            item.remarks === "Document is not uploaded yet.")
        ) {
          alert("Please add remarks when you reject a document.");
          break outerLoop;
        } else {
          const response = await axios.patch(
            "https://xxtmw06j-3002.inc1.devtunnels.ms/admin/documents/status",
            {
              documentId: item.id,
              status: item.isCorrect,
              remarks: item.isCorrect === "approved" ? "" : item.remarks,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log(response);
        }
      }
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };

  const handleUpdatedStatusSubmit = async (e) => {
    e.preventDefault();
    console.log(updatedDriverProfileStatus, updatedPassengerProfileStatus);

    if (updatedDriverProfileStatus != null) {
      try {
        const response = await axios.patch(
          "https://xxtmw06j-3002.inc1.devtunnels.ms/admin/driver-profiles/status",
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
      } catch (error) {
        console.log(error);
      }
    }

    if (updatedPassengerProfileStatus != null) {
      try {
        const response = await axios.patch(
          "https://xxtmw06j-3002.inc1.devtunnels.ms/admin/passenger-profiles/status",
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
      } catch (error) {
        console.log(error);
      }
    }

    // window.location.reload();
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
