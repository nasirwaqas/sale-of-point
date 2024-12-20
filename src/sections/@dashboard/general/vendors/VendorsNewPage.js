import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import VendorsNewForm from './VendorsNewForm';

// ----------------------------------------------------------------------

export default function VendorsNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>  Create Vendor | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Vendor Information"
          links={[
            {
              name: 'Vendors',
              href: PATH_DASHBOARD.root,
            },
            
            
          ]}
        />
        <VendorsNewForm />
      </Container>
    </>
  );
}
