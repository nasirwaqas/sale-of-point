import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import CategoryNewEditForm from '../../sections/@dashboard/general/category/CategoryNewEditForm';

// ----------------------------------------------------------------------

export default function CategoryNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Category: Create a new Category | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Category Information"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Categories',
              href: PATH_DASHBOARD.categories.list,
            },{
              name: 'New Category',

            }
          ]}
        />
        <CategoryNewEditForm />
      </Container>
    </>
  );
}
