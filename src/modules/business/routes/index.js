import { business } from "api/endpoints";

const { importView } = require("../utils");

const BusinessList = importView("Business/List");
const BusinessForm = importView("Business/Form");

const businessRoutes = {
  children: [
    {
      path: business.businesses,
      element: <BusinessList />,
    },

    {
      path: `${business.business}/:businessId`,
      element: <BusinessForm />,
    },
  ],
};

export default businessRoutes;
