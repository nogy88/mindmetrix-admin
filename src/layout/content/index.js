import React, { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import { Layout, Spin } from "antd";
import routes from "config/routes";
const AntContent = Layout.Content;

const Content = () => {
  return (
    <AntContent>
      <Suspense fallback={<Spin />}>
        {/* <ErrorBoundary> */}
        {/* <Routes>
            <Route path={"/"} element={<PersonList />} />
            <Route path={"/test"} element={<TestScreen />} />
          </Routes> */}
        {useRoutes(routes)}
        {/* </ErrorBoundary> */}
      </Suspense>
    </AntContent>
  );
};

export default Content;
