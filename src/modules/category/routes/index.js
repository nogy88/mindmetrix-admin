import { category } from "api/endpoints";

const { importView } = require("../utils");

const CategoryList = importView("Category/List");
const CategoryForm = importView("Category/Form");

const categoryRoutes = {
  children: [
    {
      path: category.categories,
      element: <CategoryList />,
    },

    {
      path: `${category.category}/:categoryId`,
      element: <CategoryForm />,
    },
  ],
};

export default categoryRoutes;
