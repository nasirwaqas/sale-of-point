import React, { useState } from 'react';
import { Container, Grid, Stack, TextField, Button, Box } from '@mui/material';
// utils
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  DateRangePicker,
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppRecentInvoice,
  AppTopSaleProducts,
  AppProductsOnLowStack,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const { user } = useAuthContext();
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();

  // State for DateRangePicker
  // State for dates
  const today = format(new Date(), 'yyyy-MM-dd'); // Default today's date
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  // Handlers
  const handleSearch = () => {
    console.log('Search clicked with dates:', { fromDate, toDate });
  };



  return (
    <>
      <Helmet>
        <title> General: App | Point of Sale UI </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        {/* Date Range Picker */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TextField
            label="From Date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            sx={{ mr: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            sx={{ mr: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {/* Dashboard Widgets */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Visited Customers"
              percent={2.6}
              total={18765}
              chart={{
                colors: [theme.palette.primary.main],
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Purchase"
              percent={0.2}
              total={4876}
              chart={{
                colors: [theme.palette.info.main],
                series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Purchase Return"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Sale"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Sale Return"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Customer Balance"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Customer Cullected"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Vendor Balance"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Vendor Paid"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>


          <Grid item xs={12} lg={6}>
            <AppRecentInvoice
              title="Recent Invoice"
              tableData={_appInvoices}
              tableLabels={[
                { id: 'type', label: 'Type' },
                { id: 'time', label: 'Time' },
                { id: 'invoice', label: 'Invoice#' },
                { id: 'totalamount', label: 'Total Amount' },
              ]}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <AppTopSaleProducts
              title="Top Sale Product"
              tableData={_appInvoices}
              tableLabels={[
                { id: 'code', label: 'Code' },
                { id: 'name', label: 'Name' },
              ]}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <AppProductsOnLowStack
              title="Products On Low Stack"
              tableData={_appInvoices}
              tableLabels={[
                { id: 'code', label: 'Code' },
                { id: 'name', label: 'Name' },
                { id: 'batch', label: 'Batch' },
                { id: 'quantity', label: 'Quantity' },
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
