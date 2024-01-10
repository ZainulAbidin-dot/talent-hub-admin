import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useDeletePostMutation, useGetPostsQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { setCustomerId } from "state";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { VisibilityOutlined } from "@mui/icons-material";

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const columns = [
    {
      field: "profilePic",
      headerName: "Post Image",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.row.postImage} />
          </>
        );
      },
    },
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      editable: true,
    },
    {
      field: "companyId",
      headerName: "Company Id",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "content",
      headerName: "Content",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        const isInEditMode =
          modifiedData[params.row.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleSaveClick(params.row.id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(params.row.id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<VisibilityOutlined />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(params.row.id, params.row.role)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.row.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleSaveClick = () => {};

  const handleEditClick = (id, role) => {
    console.log(role, id);
    dispatch(setCustomerId(id));
    navigate(`/single-post/${id}`, { state: { test: id } });
  };

  const handleCancelClick = () => {};

  const handleDeleteClick = (targetPostId) => {
    deletePost(targetPostId)
      .then((res) => {
        if (res.error) {
          alert(res.error.data.message);
        }
        if (res.data === null) {
          alert("Post Deleted Successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("Error while deleting a Post");
      });
  };

  let modifiedData =
    data?.data?.map((element) => ({
      ...element,
      _id: element.id,
    })) || [];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Posts" subtitle={"List of Posts"} />
      <Box
        mt="40px"
        height="75vh"
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
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={modifiedData || []}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Posts;
