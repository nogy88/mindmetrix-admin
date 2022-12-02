import { basePackage } from "api/endpoints";

const { importView } = require("../utils");

const PackageList = importView("Package/List");
const PackageForm = importView("Package/Form");

const packageRoutes = {
  children: [
    {
      path: basePackage.packages,
      element: <PackageList />,
    },

    {
      path: `${basePackage.package}:packageId`,
      element: <PackageForm />,
    },
  ],
};

export default packageRoutes;
