export const auth = {
  signin: "/admin/signin",
};

const baseAdmin = "/admin/";
export const admin = {
  admins: `${baseAdmin}users`,
  admin: `${baseAdmin}user/`,
};

export const dict = {
  enum: `${baseAdmin}dict/enum`,
  table: `${baseAdmin}dict/table`,
};

export const business = {
  businesses: `${baseAdmin}businesses`,
  business: `${baseAdmin}business/`,
};

export const category = {
  categories: `${baseAdmin}categories`,
  category: `${baseAdmin}category/`,
};

export const basePackage = {
  packages: `${baseAdmin}packages`,
  package: `${baseAdmin}package/`,
};

export const test = {
  tests: `${baseAdmin}tests`,
  test: `${baseAdmin}test/`,
  factors: `${baseAdmin}test/factors`,
  factor: `${baseAdmin}test/factor/`,
  factorResults: `${baseAdmin}factor/results`,
  factorResult: `${baseAdmin}factor/result/`,
  groups: `${baseAdmin}test/groups`,
  group: `${baseAdmin}test/group/`,
  matrixs: `${baseAdmin}test/matrixs`,
  matrix: `${baseAdmin}test/matrix/`,
  questions: `${baseAdmin}questions`,
  question: `${baseAdmin}question/`,
};

export const uploadFile = {
  uploadFile: "/admin/upload/file",
};

export const baseQuestion = {
  questions: `${baseAdmin}questions`,
  question: `${baseAdmin}question/`,
};
