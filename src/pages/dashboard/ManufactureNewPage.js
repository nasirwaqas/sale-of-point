import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import ManufactureNewEditForm from '../../sections/@dashboard/general/manufacture/ManufactureNewEditForm';

// ----------------------------------------------------------------------

export default function ManufactureNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Create Manufacturer | Point of Sale UI</title>
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
              name: 'Manufactures',
              href: PATH_DASHBOARD.manufacture.root,
            },
          ]}
        />
        <ManufactureNewEditForm />
      </Container>
    </>
  );
}
