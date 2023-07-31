import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import NoDataFound from "../CustomComponents/NoDataFound";
import { useEffect, useState } from "react";

const CustomDataGrid = (props) => {
  const [pageSize, setPageSize] = useState(props.pageSize);
  const [currentpage, setCurrentPage] = useState(
    props.pageValue !== undefined && props.pageValue !== null
      ? props.pageValue
      : 0
  );
  const [currentPageLoading, setCurrentPageLoading] = useState(
    props.loading !== undefined && props.loading !== null
      ? props.loading
      : false
  );

  useEffect(() => {
    setCurrentPage(props.pageValue);
    setCurrentPageLoading(props.loading);
    setPageSize(props.pageSize);
  }, [props]);

  const NoRowsOverlay = () => {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <NoDataFound message={props.noDataMessage} />
      </Stack>
    );
  };

  const NoResultsOverlay = () => {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <NoDataFound message={props.noDataOnFilterMessage} />
      </Stack>
    );
  };
  const handlePageChange = (pageNumber) => {
    console.log(currentpage);
    setCurrentPage(pageNumber);
    setCurrentPageLoading(true);
    setTimeout(() => {
      setCurrentPageLoading(false);
      props.gridLazyLoad(pageNumber);
    }, 500);
  };

  return (
    <DataGrid
      sx={{
        boxShadow: 2,
        border: 2,
        height: props.gridHeight ? props.gridHeight : "320px",
        width: props.gridWidth ? props.gridWidth : "100%",
        borderColor: "white",
        "& .MuiDataGrid-row:hover": {
          color: "#004A92",
          backgroundColor: "#B8E4F4",
        },
        "& .MuiDataGrid-columnHeaders": {
          color: "white",
          fontFamily: "Roboto",
          backgroundColor: "#004A92",
        },
      }}
      rows={props.rows}
      columns={props.columns}
      pageSize={pageSize}
      page={currentpage}
      loading={props.loading ? props.loading : currentPageLoading}
      headerHeight={48}
      rowHeight={props.rowHeight ? props.rowHeight : 52}
      onPageSizeChange={props.onPageSizeChange}
      onPageChange={(number) => handlePageChange(number)}
      rowsPerPageOptions={props.pageSizeOptions}
      disableSelectionOnClick
      getRowClassName={(params) =>
        params.id % 2 ? `super-app-theme--even` : `super-app-theme--odd`
      }
      onRowDoubleClick={props.rowDoubleClickHandler}
      components={{ NoRowsOverlay, NoResultsOverlay }}
      hideFooter={props.hideFooter ? true : false}
      checkboxSelection={
        props.checkboxSelection ? props.checkboxSelection : false
      }
      getRowId={props.getRowId}
      onCellEditCommit={props.onCellEditCommit}
      onRowClick={props.onRowClick}
      // sortModel={props.sortModel}
      columnVisibilityModel={props.columnVisibilityModel}
      onCellDoubleClick={props.onCellDoubleClick}
      onEditCellChange={props.onEditCellChange}
      initialState={props.initialState}
      onCellClick={props.onCellClick}
      onSelectionModelChange={props.onSelectionModelChange}
      onCellKeyDown={props.onCellKeyDown}
      sortingMode={props.sortingMode ? props.sortingMode : "client"}
      onSortModelChange={(event) => {
        props.onSortModelChange(event);
      }}
    />
  );
};

export default CustomDataGrid;
