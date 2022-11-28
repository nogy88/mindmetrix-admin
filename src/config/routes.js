// import appRoutes from "modules/app/routes";
// import custRoutes from "modules/cust/routes";
// import admRoutes from "modules/admin/routes";
// import baRoutes from "modules/ba/routes";
// import lnRoutes from "modules/ln/routes";
// import dpRoutes from "modules/dp/routes";
// import paRoutes from "modules/pa/routes";
// import feeRoutes from "modules/fee/routes";
// import rptRoutes from "modules/rpt/routes";
// import collRoutes from "modules/coll/routes";
// import Dashboard from "modules/dashboard";

import adminRoutes from "modules/admin/routes";
import businessRoutes from "modules/business/routes";
import categoryRoutes from "modules/category/routes";
import Dashboard from "modules/dashboard";
import packageRoutes from "modules/package/routes";
import testRoutes from "modules/test/routes";
import Error404 from "views/Error404";

const routes = [
  adminRoutes,

  businessRoutes,
  categoryRoutes,
  packageRoutes,
  testRoutes,
  // appRoutes,
  // custRoutes,

  // admRoutes,
  // baRoutes,
  // lnRoutes,
  // collRoutes,
  // dpRoutes,
  // paRoutes,
  // feeRoutes,
  // rptRoutes,
  // {
  //   path: "/",
  //   element: <TestScreen />,
  // },
  // {
  //   path: "/cust/persons",
  //   element: <PersonList />,
  // },
  // {
  //   path: "/cust/person",
  //   element: <PersonForm />,
  // },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];

export default routes;
