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
import { UserTableToolbar } from '../../../../sections/@dashboard/user/list';

// ----------------------------------------------------------------------

AnalyticsCategory.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
};

export default function AnalyticsCategory({ title, subheader, tableData, tableLabels, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      {/* <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          /> */}

      <TableContainer sx={{ overflow: 'unset' }}>
       
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />
     
            <TableBody>
              {tableData.map((row) => (
                <AnalyticsCategoryRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
      </TableContainer>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

AnalyticsCategoryRow.propTypes = {
  row: PropTypes.shape({
    code: PropTypes.number,
    name: PropTypes.string,

  }),
};

function AnalyticsCategoryRow({ row }) {
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
        <TableCell>{row.name}</TableCell>

        <TableCell>{row.discription}</TableCell>

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
