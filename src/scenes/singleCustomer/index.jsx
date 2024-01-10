import React, { useEffect, useState } from "react";
import { useGetSingleCustomerQuery } from "state/api";
import {
  Box,
  useTheme,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import Header from "components/Header";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector } from "react-redux";
import UserDetailsCard from "./UserDetailsCard";
import CompanyDetailsCard from "./CompanyDetailsCard";
import JobseekerDetailsCard from "./JobseekerDetailsCard";
import TestDetailsCard from "./TestDetailsCard";
import profileImage from "assets/profile.jpg";

const SingleCustomer = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSingleCustomerQuery(id);
  const [formData, setFormData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [updatedDriverProfileStatus, setUpdatedDriverProfileStatus] =
    useState(null);
  const [updatedPassengerProfileStatus, setUpdatedPassengerProfileStatus] =
    useState(null);
  const [updatedsingleTestStatus, setUpdatedsingleTestStatus] = useState({
    id: null,
    status: null,
  });

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

  useEffect(() => {
    if (!isLoading && data != null && data !== undefined) {
      console.log(data.data);
      setFormData({
        id: data.data.id,
        name: data.data.username,
        email: data.data.email,
        role: data.data.role,
        jobseeker: data.data.jobseeker,
        company: data.data.company,
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
        refetch();
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
        refetch();
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
    }

    // window.location.reload();
  };

  console.log("User : ", data);

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
              {/* For Profile Picture */}
              {formData.jobseeker ? (
                <Card
                  variant="outlined"
                  style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    padding: "1rem 2rem",
                    position: "relative",
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
                      height: 200,
                      width: 200,
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setModalImage(formData.jobseeker.profileImage);
                      setOpenModal(true);
                    }}
                    image={formData.jobseeker.profileImage || profileImage}
                    title="User Image"
                  />
                </Card>
              ) : null}

              {/* For Company Logo and Cover Image */}
              {formData.company?.logo ? (
                <Card
                  variant="outlined"
                  style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    padding: "1rem 2rem",
                    position: "relative",
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                      Logo And Cover Image
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    style={{
                      height: 200,
                      width: 200,
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setModalImage(formData.company.logo);
                      setOpenModal(true);
                    }}
                    image={formData.company.logo || profileImage}
                    title="Logo Image"
                  />
                  <CardMedia
                    component="img"
                    style={{
                      height: 200,
                      width: 200,
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setModalImage(formData.company.coverImage);
                      setOpenModal(true);
                    }}
                    image={formData.company.coverImage || profileImage}
                    title="Cover Image"
                  />
                </Card>
              ) : null}

              {formData.name ? (
                <UserDetailsCard
                  key={id}
                  id={id}
                  name={formData.name}
                  email={formData.email}
                  role={formData.role}
                />
              ) : null}

              {formData.company ? (
                <CompanyDetailsCard
                  id={formData.company.id}
                  name={formData.company.name}
                  description={formData.company.description}
                  contactNumber={formData.company.contactNumber}
                  country={formData.company.country}
                  city={formData.company.city}
                  size={formData.company.size}
                  verified={formData.company.verified}
                  logo={formData.company.logo}
                  coverImage={formData.company.coverImage}
                  instagramUrl={formData.company.instagramUrl}
                  facebookUrl={formData.company.facebookUrl}
                  linkedInUrl={formData.company.linkedInUrl}
                  twitterUrl={formData.company.twitterUrl}
                  website={formData.company.website}
                  foundedYear={formData.company.foundedYear}
                />
              ) : null}

              {formData.jobseeker ? (
                <JobseekerDetailsCard
                  id={formData.jobseeker.id}
                  name={
                    formData.jobseeker.firstName +
                    " " +
                    formData.jobseeker.lastName
                  }
                  contactNumber={formData.jobseeker.contactNumber}
                  country={formData.jobseeker.country}
                  city={formData.jobseeker.city}
                  education={formData.jobseeker.education}
                  experience={formData.jobseeker.experience}
                  profileImage={formData.jobseeker.profileImage}
                  resume={formData.jobseeker.resume}
                  skills={formData.jobseeker.skills}
                />
              ) : null}

              {formData.company && formData.company?.test.length > 0
                ? formData?.company?.test.map((singleTest, index) => (
                    <TestDetailsCard
                      key={index}
                      testNumber={index + 1}
                      id={singleTest.id}
                      companyId={singleTest.companyId}
                      name={singleTest.name}
                      skills={singleTest.skills}
                      startedAt={singleTest.startedAt}
                      endedAt={singleTest.endedAt}
                    />
                  ))
                : null}
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
      </Box>
    </Box>
  );
};

export default SingleCustomer;
