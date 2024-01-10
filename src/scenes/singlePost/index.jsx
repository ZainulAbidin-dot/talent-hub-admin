import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Header from "components/Header";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSinglePostQuery } from "state/api";
import profileImage from "assets/profile.jpg";

const SinglePost = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const { id } = useParams();
  const { data, isLoading } = useGetSinglePostQuery(id);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const modifiedData = data?.data;
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Post" subtitle="Details of Post" />

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
        {modifiedData == null || isLoading ? (
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
                        setModalImage(modifiedData.postImage);
                        setOpenModal(true);
                      }}
                      image={modifiedData.postImage || profileImage}
                      title="User Image"
                    />
                  </Card>

                  <Typography
                    sx={{ fontSize: 28 }}
                    color={theme.palette.secondary[400]}
                    gutterBottom
                  >
                    {modifiedData.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color={theme.palette.secondary[400]}
                    gutterBottom
                  >
                    {modifiedData.content}
                  </Typography>

                  <Typography color={theme.palette.secondary[400]}>
                    Post Id: {modifiedData.id}
                  </Typography>
                  <Typography color={theme.palette.secondary[400]}>
                    Company Id: {modifiedData.companyId}
                  </Typography>
                  <Typography color={theme.palette.secondary[400]}>
                    Created At: {modifiedData.createdAt}
                  </Typography>
                </CardContent>
              </Card>
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
export default SinglePost;
