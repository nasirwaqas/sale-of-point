import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import ProductNewForm from './ProductNewForm';

// ----------------------------------------------------------------------

export default function ProductNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>  Add Product | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Product"
          links={[
            {
    
              href: PATH_DASHBOARD.root,
            },
            {
              
              href: PATH_DASHBOARD.user.list,
            },
            
          ]}
        />
        <ProductNewForm />
      </Container>
    </>
  );
}
