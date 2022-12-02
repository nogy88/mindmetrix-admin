import { admin } from "api/endpoints";

const { importView } = require("../utils");

const AdminList = importView("List");
const AdminForm = importView("Form");

const adminRoutes = {
  children: [
    {
      path: admin.admins,
      element: <AdminList />,
    },
    {
      path: `${admin.admin}:userId`,
      element: <AdminForm />,
    },
  ],
};

export default adminRoutes;
