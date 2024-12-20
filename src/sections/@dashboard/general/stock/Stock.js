import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Tabs,
  Tab,
  AppBar,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

export default function Stock() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState(null);
  const [company, setCompany] = useState("");
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const categories = ["Electronics", "Furniture", "Clothing", "Toys", "Groceries"];
  const companies = ["Company A", "Company B", "Company C", "Company D"];

  return (
    <Box sx={{ p: 3 }}>
      {/* First Section */}
      <Box>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight="bold">
              Stock
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button variant="contained" sx={{ m: 0.6 }}>
              Stock Adjustment
            </Button>
            <Button variant="contained" sx={{ m: 0.7 }}>
              Stock Expiry
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ mt: 3 }}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="stock tabs"
          >
            <Tab label="By Category" {...a11yProps(0)} />
            <Tab label="By Company" {...a11yProps(1)} />
            <Tab label="All" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* Autocomplete, Dropdown, and Search Button in the same row */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Autocomplete
                options={categories}
                value={category}
                onChange={(event, newValue) => setCategory(newValue)}
                renderInput={(params) => <TextField {...params} label="Select Category" />}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Display Order</InputLabel>
                <Select
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  label="Company"
                >
                  {companies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={0} textAlign="right">
              <Button variant="contained" sx={{ m: 2 }} size="large">
                Search
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
           {/* Autocomplete, Dropdown, and Search Button in the same row */}
           <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Autocomplete
                options={categories}
                value={category}
                onChange={(event, newValue) => setCategory(newValue)}
                renderInput={(params) => <TextField {...params} label="Select Company" />}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Display Order</InputLabel>
                <Select
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  label="Company"
                >
                  {companies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={0} textAlign="right">
              <Button variant="contained" sx={{ m: 2 }} size="large">
                Search
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
           {/* Autocomplete, Dropdown, and Search Button in the same row */}
           <Grid container spacing={2} alignItems="center">

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Display Order</InputLabel>
                <Select
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  label="Company"
                >
                  {companies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={0} textAlign="right">
              <Button variant="contained" sx={{ m: 2 }} size="large">
                Search
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </Box>
  );
}
