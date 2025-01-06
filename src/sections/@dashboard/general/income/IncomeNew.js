import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem, CircularProgress } from '@mui/material';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useSnackbar } from 'notistack';

const GET_INCOME_TYPES_BY_BRANCH = gql`
  query GetIncomeTypesByBranch($branchId: ID!) {
    getIncomeTypesByBranch(branchId: $branchId) {
      id
      name
      description
    }
  }
`;

const CREATE_INCOME = gql`
  mutation CreateIncome($branchId: ID!, $incomeType: IncomeTypeInput!, $amount: Float!, $description: String) {
    createIncome(branchId: $branchId, incomeType: $incomeType, amount: $amount, description: $description) {
      id
      branchId
      incomeType {
        id
        name
        description
      }
      amount
      description
      createdAt
      updatedAt
    }
  }
`;

const IncomeNew = () => {
  const [selectedIncomeType, setSelectedIncomeType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Hook to trigger notifications

  const { loading, error: queryError, data } = useQuery(GET_INCOME_TYPES_BY_BRANCH, {
    variables: { branchId: '6770c752a14170831ad68c75' },
  });

  const [createIncome] = useMutation(CREATE_INCOME, {
    onCompleted: () => {
      enqueueSnackbar('Income saved successfully!', { variant: 'success' });
      navigate('/');
    },
    onError: (error) => {
      enqueueSnackbar(`Error saving income: ${error.message}`, { variant: 'error' });
    },
  });

  const handleIncomeTypeChange = (event) => {
    setSelectedIncomeType(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    if (!selectedIncomeType) {
      enqueueSnackbar('Please select an income type', { variant: 'warning' });
      return;
    }

    const selectedIncomeTypeObject = data.getIncomeTypesByBranch.find(
      (incomeType) => incomeType.id === selectedIncomeType
    );

    const incomeData = {
      branchId: '6770c752a14170831ad68c75',
      incomeType: {
        id: selectedIncomeTypeObject.id,
        name: selectedIncomeTypeObject.name,
        description: selectedIncomeTypeObject.description,
      },
      amount: parseFloat(amount),
      description,
    };

    try {
      await createIncome({ variables: incomeData });
    } catch (error) {
      console.error('Error saving income:', error);
    }
  };

  if (loading) return <CircularProgress />;
  if (queryError) return <p>Error loading income types!</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Income Information</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', width: '100%', maxWidth: '500px' }}>
        <TextField
          select
          label="Income Type"
          variant="outlined"
          fullWidth
          value={selectedIncomeType}
          onChange={handleIncomeTypeChange}
        >
          {data.getIncomeTypesByBranch.map((incomeType) => (
            <MenuItem key={incomeType.id} value={incomeType.id}>
              {incomeType.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Amount"
          type="number"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
        />
      </div>

      <div style={{ marginBottom: '20px', width: '100%', maxWidth: '500px' }}>
        <TextField
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default IncomeNew;
