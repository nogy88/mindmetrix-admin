import { business } from "api/endpoints";

const { importView } = require("../utils");

const BusinessList = importView("Business/List");

const businessRoutes = {
  children: [
    {
      path: business.businesses,
      element: <BusinessList />,
    },
  ],
};

export default businessRoutes;
