import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import CustomerNewForm from './CustomerNewForm';

// ----------------------------------------------------------------------

export default function CustomerNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>  Create Customer | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Customer Information"
          links={[
            {
              name: 'Customer',
              href: PATH_DASHBOARD.root,
            },
            
            
          ]}
        />
        <CustomerNewForm />
      </Container>
    </>
  );
}
