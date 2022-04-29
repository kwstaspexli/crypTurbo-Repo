import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { useSelector } from "react-redux";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

import { useHistory } from "react-router-dom";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";


// const CustomDataGrid = styled(DataGrid)(() => ({
//   ".MuiDataGrid-iconButtonContainer": {
//     visibility: "visible",
//     width: "0 !important"
//   }
// }));

function CustomUnsortedIcon() {
  return <UnfoldMoreIcon />
  // i use it as a component for sort icon in my datagrid
}

const Datagrid=({handleSearch}) =>{
  
  const currency = useSelector((state) => state.currency.currency);
  const history = useHistory();

  const columns = [
    { field: 'market_cap_rank', 
      headerName: 'RANK',
      flex: 0.15,
      minWidth: 60,
      headerAlign: 'center',
      align: "center",
    },
    {
      field: 'name',
      headerName: 'ASSET',
      flex: 0.35,
      minWidth: 120,
      headerAlign: 'center',
      align: "left",
  
      renderCell: (params) => {
        // console.log(params.row);
        return <>
                {<Avatar alt={params.row.name} 
                src ={params.row.image} 
                sx={{ margin: "10px" }}
                /> || ''}  
                {params.row.name || ''} 
                <p style={{color: "grey", marginLeft:"5px", fontWeight:"500"}}>
                  {params.row.symbol.toUpperCase() || ''}
                </p>
               </>
      }   
    },
    {
      field: 'current_price',
      headerName: 'PRICE',
      flex: 0.25,
      minWidth: 120,
      headerAlign: 'center',
      align: "center",
      type: 'number',
      valueFormatter: (params) => {
        return `${currency.symbol}${params.value.toLocaleString()}`;
      },
    },
    {
      field: 'price_change_percentage_24h',
      headerName: '24H% PRICE CHANGE',
      flex: 0.2,
      minWidth: 120,
      headerAlign: 'center',
      align: "center",
      renderCell: (params) => {
        const valueFormatted = Number(params.value).toLocaleString();
        return (params.value > 0 ? 
          <><ArrowUpwardRoundedIcon/>{`${valueFormatted}`}</>
          : <><ArrowDownwardRoundedIcon/>{`${valueFormatted}`}</>);
      },
    },
    {
      field: 'price_change_percentage_7d_in_currency',
      headerName: '7d% PRICE CHANGE',
      flex: 0.2,
      minWidth: 120,
      headerAlign: 'center',
      align: "center",
      renderCell: (params) => {
        const valueFormatted = Number(params.value).toLocaleString();
        return (params.value > 0 ? 
          <><ArrowUpwardRoundedIcon/>{`${valueFormatted}`}</>
          : <><ArrowDownwardRoundedIcon/>{`${valueFormatted}`}</>);
      },
    },
    {
      field: 'market_cap',
      headerName: 'MARKET CAP',
      flex: 0.25,
      minWidth: 120,
      headerAlign: 'center',
      align: "center",
      valueFormatter: (params) => {
        return `${currency.symbol}${params.value.toLocaleString()}`;
      },
    },
    {
      field: 'total_volume',
      headerName: 'VOLUME',
      flex: 0.25,
      minWidth: 120,
      headerAlign: 'center',
      align: "center",
      valueFormatter: (params) => {
        return  `${currency.symbol}${params.value.toLocaleString()}`;
      },
    },
  ];



  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        autoHeight={true}
        rows={handleSearch}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[7]}
        checkboxSelection={false}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        disableSelectionOnClick={true}
        hideFooterSelectedRowCount={true}
        LoadingOverlay={true}
        loading={handleSearch.length === 0}
        scrollbarSize={10}

        components={{
          ColumnUnsortedIcon: CustomUnsortedIcon
        }}

        sx={{
          fontSize: 16,
          cursor: "pointer",
          '& .negative': {
            color: 'red',
            fontSize: 18,
          },
          '& .positive': {
            color: 'green',
            fontSize: 18
          },
        }}

        getCellClassName={(params) => {
          if ( params.field === "price_change_percentage_24h" 
              || params.field === "price_change_percentage_7d_in_currency")
               { return params.value > 0 ? 'positive' : 'negative';
          }
          return '';
        }}

        onRowClick= {(params) => {
          history.push(`/coins/${params.id}`);
          }}

      />
    </div>
  );
}

export default Datagrid