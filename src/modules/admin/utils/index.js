import { lazy } from "react";

export const importView = (name) => {
  return lazy(() =>
    import(/* webpackChunkName: "dp-[request]" */ `modules/admin/views/${name}`)
  );
};
