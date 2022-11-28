import { basePackage, test } from "api/endpoints";

const { importView } = require("../utils");

const TestList = importView("Test/List");
const TestForm = importView("Test/Form");

const testRoutes = {
  children: [
    {
      path: test.tests,
      element: <TestList />,
    },

    {
      path: `${test.test}/:testId`,
      element: <TestForm />,
    },
  ],
};

export default testRoutes;
