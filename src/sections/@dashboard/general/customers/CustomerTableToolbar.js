import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
import Iconify from '../../../../components/iconify';
import { GET_CUSTOMER_BY_BRANCH } from '../../../../graphQL/queries';

CustomerTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onSearchResults: PropTypes.func,
};

export default function CustomerTableToolbar({ isFiltered, onResetFilter, onSearchResults }) {
  const branchId = '60d0fe4f5311236168a109ca'; // Replace with dynamic branchId as needed

  const [filterCustomers, { data: filteredCustomersData, error }] = useLazyQuery(GET_CUSTOMER_BY_BRANCH, {
    onCompleted: (data) => {
      console.log('Fetched Data:', data.getCustomerByBranch); // Log fetched data
      onSearchResults(data.getCustomerByBranch);
    },
  });

  const [filterArea, setFilterArea] = useState('');
  const [filterName, setFilterName] = useState('');
  const [areaOptions, setAreaOptions] = useState([]);

  // Fetch filtered customers based on area and name
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (branchId) {
        console.log('Fetching with Filters:', { branchId, filterArea, filterName });
        filterCustomers({ variables: { branchId, area: filterArea, name: filterName } });
      }
    }, 300); // Debounce time
    return () => clearTimeout(timeoutId);
  }, [filterArea, filterName, branchId, filterCustomers]);

  // Populate area options from query data
  useEffect(() => {
    if (filteredCustomersData) {
      const uniqueAreas = Array.from(
        new Set(filteredCustomersData.getCustomerByBranch.map((customer) => customer.customerAreaId))
      ).map((id) => filteredCustomersData.getCustomerByBranch.find((customer) => customer.customerAreaId === id));

      const formattedAreas = uniqueAreas.map((area) => ({ id: area.customerAreaId, name: area.area }));
      console.log('Unique Areas:', formattedAreas); // Log area options
      setAreaOptions(formattedAreas);
    }
  }, [filteredCustomersData]);

  const handleAreaChange = (event) => {
    console.log('Selected Area:', event.target.value); // Log selected area
    setFilterArea(event.target.value);
  };

  const handleNameChange = (event) => {
    console.log('Search Name:', event.target.value); // Log search name
    setFilterName(event.target.value);
  };

  const handleClearFilters = () => {
    console.log('Filters Cleared');
    setFilterArea('');
    setFilterName('');
    onResetFilter();
  };

  if (error) {
    console.error('Error fetching customers:', error.message);
  }

  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ px: 2.5, py: 3 }}
    >
      {/* Filter by Area */}
      <TextField
        fullWidth
        select
        label="Filter by Area"
        value={filterArea}
        onChange={handleAreaChange}
        SelectProps={{
          MenuProps: {
            PaperProps: { sx: { maxHeight: 260 } },
          },
        }}
        sx={{ maxWidth: { sm: 240 }, textTransform: 'capitalize' }}
      >
        {/* Always show "All Areas" */}
        <MenuItem value="" sx={{ typography: 'body2', textTransform: 'capitalize' }}>
          All Areas
        </MenuItem>
        {/* Always display all areas */}
        {areaOptions.map((area) => (
          <MenuItem
            key={area.id}
            value={area.name}
            sx={{ mx: 1, borderRadius: 0.75, typography: 'body2', textTransform: 'capitalize' }}
          >
            {area.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Search by Name */}
      <TextField
        fullWidth
        value={filterName}
        onChange={handleNameChange}
        placeholder="Search by Name..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Clear Filter Button */}
      {filterArea || filterName ? (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={handleClearFilters}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      ) : null}
    </Stack>
  );
}
