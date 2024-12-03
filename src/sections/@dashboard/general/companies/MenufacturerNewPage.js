import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import MenufacturerNewForm from './MenufacturerEditForm';

// ----------------------------------------------------------------------

export default function MenufacturerNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>  Create Menufacturer | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Menufacturer Information"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              
              href: PATH_DASHBOARD.user.list,
            },
            
          ]}
        />
        <MenufacturerNewForm />
      </Container>
    </>
  );
}
