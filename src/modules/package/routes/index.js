import { basePackage } from "api/endpoints";

const { importView } = require("../utils");

const PackageList = importView("Package/List");

const packageRoutes = {
  children: [
    {
      path: basePackage.packages,
      element: <PackageList />,
    },
  ],
};

export default packageRoutes;
