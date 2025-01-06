import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem, CircularProgress, Container } from '@mui/material';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useSnackbar } from 'notistack';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import { PATH_DASHBOARD } from '../../../../routes/paths';

const GET_EXPENSE_TYPES_BY_BRANCH = gql`
  query GetExpenseTypesByBranch($branchId: ID!) {
    getExpenseTypesByBranch(branchId: $branchId) {
      id
      name
      description
    }
  }
`;

const CREATE_EXPENSE = gql`
  mutation CreateExpense($branchId: ID!, $expenseType: ExpenseTypeInput!, $amount: Float!, $description: String) {
    createExpense(branchId: $branchId, expenseType: $expenseType, amount: $amount, description: $description) {
      id
      branchId
      expenseType {
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

const ExpenseNew = () => {
  const [selectedExpenseType, setSelectedExpenseType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Hook to trigger notifications
  const { themeStretch } = useSettingsContext();

  const { loading, error: queryError, data } = useQuery(GET_EXPENSE_TYPES_BY_BRANCH, {
    variables: { branchId: '6770c752a14170831ad68c75' },
  });

  const [createExpense] = useMutation(CREATE_EXPENSE, {
    onCompleted: () => {
      enqueueSnackbar('Expense saved successfully!', { variant: 'success' });
      navigate('/');
    },
    onError: (error) => {
      enqueueSnackbar(`Error saving expense: ${error.message}`, { variant: 'error' });
    },
  });

  const handleExpenseTypeChange = (event) => {
    setSelectedExpenseType(event.target.value);
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
    if (!selectedExpenseType) {
      enqueueSnackbar('Please select an expense type', { variant: 'warning' });
      return;
    }

    const selectedExpenseTypeObject = data.getExpenseTypesByBranch.find(
      (expenseType) => expenseType.id === selectedExpenseType
    );

    const expenseData = {
      branchId: '6770c752a14170831ad68c75',
      expenseType: {
        id: selectedExpenseTypeObject.id,
        name: selectedExpenseTypeObject.name,
        description: selectedExpenseTypeObject.description,
      },
      amount: parseFloat(amount),
      description,
    };

    try {
      await createExpense({ variables: expenseData });
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  if (loading) return <CircularProgress />;
  if (queryError) return <p>Error loading expense types!</p>;

  return (
    <>
      <Helmet>
        <title>Expense New | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Expense Types"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Expense', href: PATH_DASHBOARD.root.expense },
            { name: ' New' },
          ]}
        />
      </Container>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Expense Information</h2>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', width: '100%', maxWidth: '500px' }}>
          <TextField
            select
            label="Expense Type"
            variant="outlined"
            fullWidth
            value={selectedExpenseType}
            onChange={handleExpenseTypeChange}
          >
            {data.getExpenseTypesByBranch.map((expenseType) => (
              <MenuItem key={expenseType.id} value={expenseType.id}>
                {expenseType.name}
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
    </>
  );
};

export default ExpenseNew;
