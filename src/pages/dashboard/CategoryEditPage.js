import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Skeleton } from '@mui/material';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import CategoryNewEditForm from '../../sections/@dashboard/general/category/CategoryNewEditForm';

import { GET_CATEGORY_BY_ID } from '../../graphQL/queries';

// ----------------------------------------------------------------------

export default function CategoryEditPage() {
  const { themeStretch } = useSettingsContext();
  const [currentProduct, setCurrentProduct] = useState(null);
  const { id } = useParams();

  // console.log(id);
  const { data, loading, error } = useQuery(GET_CATEGORY_BY_ID, {
    variables: { id },
    fetchPolicy: 'no-cache',
    onCompleted: (completedData) => {
      console.log(completedData);
      setCurrentProduct(completedData.getCategoryById);
    },
  });
  if (loading) return <Skeleton width="100%" height={300} />;
  if (error) return <div>Error! {error.message}</div>;
  return (
    <>
      <Helmet>
        <title> Category: Edit Category | Point of Sale UI</title>
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
            },
            {
              name: 'Edit Category',
            },
          ]}
        />
        <CategoryNewEditForm isEdit="true" currentCategory={currentProduct} />
      </Container>
    </>
  );
}
