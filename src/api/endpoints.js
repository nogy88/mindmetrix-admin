export const auth = {
  signin: "/admin/signin",
};

const baseAdmin = "/admin/";
export const admin = {
  admins: `${baseAdmin}users`,
  admin: `${baseAdmin}user`,
};

export const business = {
  businesses: `${baseAdmin}businesses`,
  business: `${baseAdmin}business`,
};

export const category = {
  categories: `${baseAdmin}categories`,
  category: `${baseAdmin}category`,
};

export const basePackage = {
  packages: `${baseAdmin}packages`,
  package: `${baseAdmin}package`,
};

export const test = {
  tests: `${baseAdmin}tests`,
  test: `${baseAdmin}test`,
};

export const uploadFile = {
  uploadFile: "/admin/upload/file",
};
