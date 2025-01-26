import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
import Iconify from '../../../../components/iconify';
import { GET_PRODUCT_BY_SEARCH_FILTER } from '../../../../graphQL/queries';

ProductTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onSearchResults: PropTypes.func.isRequired, // Ensure this is a function
  branchId: PropTypes.string.isRequired,
};

export default function ProductTableToolbar({ isFiltered, onResetFilter, onSearchResults, branchId }) {
  const [filterProducts, { data: filteredProductsData, error }] = useLazyQuery(GET_PRODUCT_BY_SEARCH_FILTER, {
    onCompleted: (data) => {
      console.log('Fetched Data:', data.getProductBySearchFilter); // Log fetched data
      onSearchResults(data.getProductBySearchFilter);
    },
  });

  const [filterData, setFilterData] = useState('All');
  const [filterName, setFilterName] = useState('');

  // Fetch filtered products based on filter and name
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (branchId) {
        console.log('Fetching with Filters:', { branchId, filterData, filterName });
        filterProducts({
          variables: {
            branchId,
            status: filterData === 'All' || filterData === 'Discount Products' ? null : filterData,
            saleDiscount: filterData === 'Discount Products' ? 0 : undefined,
            name: filterName || null,
          },
        });
      }
    }, 300); // Debounce time
    return () => clearTimeout(timeoutId);
  }, [filterData, filterName, branchId, filterProducts]);

  const handleFilterChange = (event) => {
    const { value } = event.target;
    console.log('Selected filter:', value); // Log selected filter
    setFilterData(value);
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    console.log('Search Name:', value); // Log search name
    setFilterName(value);
  };

  const handleClearFilters = () => {
    console.log('Filters Cleared');
    setFilterData('All');
    setFilterName('');
    onResetFilter();
  };

  if (error) {
    console.error('Error fetching products:', error.message);
  }

  const filterOptions = ['All', 'Active', 'Deactive', 'Discount Products'];

  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ px: 2.5, py: 3 }}
    >
      {/* Filter by filter */}
      <TextField
        fullWidth
        select
        label="Filter by"
        value={filterData}
        onChange={handleFilterChange}
        SelectProps={{
          MenuProps: {
            PaperProps: { sx: { maxHeight: 260 } },
          },
        }}
        sx={{ maxWidth: { sm: 240 }, textTransform: 'capitalize' }}
      >
        {filterOptions.map((filter) => (
          <MenuItem
            key={filter}
            value={filter}
            sx={{ mx: 1, borderRadius: 0.75, typography: 'body2', textTransform: 'capitalize' }}
          >
            {filter}
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
      {filterData !== 'All' || filterName ? (
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