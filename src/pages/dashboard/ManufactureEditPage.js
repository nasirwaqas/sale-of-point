import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Skeleton } from '@mui/material';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { PATH_DASHBOARD } from '../../routes/paths';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import ManufactureNewEditForm from '../../sections/@dashboard/general/manufacture/ManufactureNewEditForm';
import { GET_MANUFACTURE_BY_ID } from '../../graphQL/queries';

// @mui
// routes
// components
// sections

// ----------------------------------------------------------------------

export default function ManufactureEditPage() {
  const { themeStretch } = useSettingsContext();
  const [currentManufacture, setCurrentManufacture] = useState(null);
  const { id } = useParams();

  // console.log(id);
  const { loading, error } = useQuery(GET_MANUFACTURE_BY_ID, {
    variables: { id },
    fetchPolicy: 'no-cache',
    onCompleted: (completedData) => {
      console.log(completedData);
      setCurrentManufacture(completedData.getManufactureById);
    },
  });
  if (loading) return <Skeleton width="100%" height={300} />;
  if (error) return <div>Error! {error.message}</div>;
  return (
    <>
      <Helmet>
        <title> Manufacturer: Edit Manufacturer | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Manufacturer Information"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Manufacturers',
              href: PATH_DASHBOARD.manufacture.root,
            },
            {
              name: 'Edit Manufacturer',
            },
          ]}
        />
        <ManufactureNewEditForm isEdit="true" currentManufacture={currentManufacture} />
      </Container>
    </>
  );
}
