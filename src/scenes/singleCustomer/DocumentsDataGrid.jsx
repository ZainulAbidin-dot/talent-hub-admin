import { useState } from 'react';
import { Box, Button, Card, CardMedia, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DOCUMENT_AND_TOPUP_STATUS } from './config';
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';


function DocumentsDataGrid({ data, title }) {
  const [documents, setDocuments] = useState(data);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleRemarksChange = (event, documentId) => {
    const { value } = event.target;
    console.log(value);
    const newDocuments = documents.map((document) => {
      if (document.id === documentId) {
        return { ...document, remarks: value };
      }
      return document;
    });

    setDocuments(newDocuments);
  };

  const handleStatusChange = (event, documentId) => {
    const { value } = event.target;
    const newDocuments = documents.map((document) => {
      if (document.id === documentId) {
        return { ...document, status: value };
      }
      return document;
    });

    setDocuments(newDocuments);
  };


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
              setModalImage(params.row.image);
              setOpenModal(true);
            }}
            image={params.row.url}
            title="User Image"
          />
        </Card>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: renderSelectEditInputCell,
      editable: true,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 250,
      editable: true,
    },
  ];

  if (data.length === 0) {
    return (
      <Typography>No Documents: {title}</Typography>
    );
  }


  return (
    <Box
      sx={{
        width: "70vw",
        margin: "2rem auto",
        flexBasis: '1'
      }}
    >
      <Typography variant="h5" style={{ marginBottom: "1rem" }}>
        {title}
      </Typography>
      <DataGrid
        autoHeight
        rows={documents}
        columns={columns}
        disableRowSelectionOnClick
        hideFooterPagination
        hideFooter
        rowHeight={(5 * 16)}
        rowSpacingType='margin'
        rowSpacing={5}
      />
      <Button variant="contained" color="primary" style={{ marginTop: "1rem" }}>
        Save Changes
      </Button>
    </Box >
  );
}

export default DocumentsDataGrid;

function SelectEditInputCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      {DOCUMENT_AND_TOPUP_STATUS.map(status => (
        <option value={status}>{status}</option>
      ))}
    </Select>
  );

}

function renderSelectEditInputCell(params) {
  return <SelectEditInputCell {...params} />;
};