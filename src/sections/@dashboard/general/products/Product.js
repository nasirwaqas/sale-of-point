import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  IconButton,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import MenuPopover from '../../../../components/menu-popover';
import { TableHeadCustom } from '../../../../components/table';
// sections
import { ProductTableToolbar } from '../../../@dashboard/general/products';

// ----------------------------------------------------------------------

Product.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
};

export default function Product({ title, subheader, tableData, tableLabels, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <ProductTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

      <TableContainer sx={{ overflow: 'unset' }}>
       
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />
     
            <TableBody>
              {tableData.map((row) => (
                <ProductRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
      </TableContainer>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill"  />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

ProductRow.propTypes = {
  row: PropTypes.shape({
    code: PropTypes.number,
    name: PropTypes.string,

  }),
};

function ProductRow({ row }) {
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };


  return (
    <>
      <TableRow>
        <TableCell>{row.productName}</TableCell>

        <TableCell>{row.productDiscription}</TableCell>

        <TableCell>{fCurrency(row.action)}</TableCell>

       

      </TableRow>
  



      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
       
      </MenuPopover>
    </>
  );
}
