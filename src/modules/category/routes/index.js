import { category } from "api/endpoints";

const { importView } = require("../utils");

const CategoryList = importView("Category/List");

const categoryRoutes = {
  children: [
    {
      path: category.categories,
      element: <CategoryList />,
    },
  ],
};

export default categoryRoutes;
