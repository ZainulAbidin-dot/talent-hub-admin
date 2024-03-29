import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
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

const Customers = ({ userType, roleForPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetCustomersQuery(roleForPage);

  const columns = [
    {
      field: "profilePic",
      headerName: "Profile Pic",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.value} />
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
      field: "username",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "emailVerified",
      headerName: "Email Verified",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
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
            aria-label="View"
            onClick={() => handleEditClick(params.row.id, params.row.role)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   onClick={() => handleDeleteClick(params.row.id)}
          //   color="inherit"
          // />,
        ];
      },
    },
  ];

  const handleSaveClick = () => {};

  const handleEditClick = (id, role) => {
    console.log(role, id);
    dispatch(setCustomerId(id));
    navigate(`/single-customer/${id}`, { state: { customerId: id } });
  };

  const handleCancelClick = () => {};

  const handleDeleteClick = () => {};

  let modifiedData =
    data?.data?.map((element) => ({
      ...element,
      _id: element.id,
    })) || [];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={userType} subtitle={"List of " + userType} />
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

export default Customers;
