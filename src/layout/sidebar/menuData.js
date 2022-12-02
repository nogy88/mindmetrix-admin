import { admin, basePackage, business, category, test } from "api/endpoints";

export const menuData = [
  {
    title: "Админ",
    icon: "UserAddOutlined",
    subMenu: [
      {
        title: "Админ",
        icon: "UserAddOutlined",
        link: admin.admins,
      },
    ],
    //  color: "#373737",
  },
  {
    title: "Бизнес",
    icon: "FundOutlined",
    subMenu: [
      {
        title: "Бизнес",
        icon: "FundOutlined",
        link: business.businesses,
      },
    ],
    //  color: "#373737",
  },
  {
    title: "Категори",
    icon: "AppstoreOutlined",
    subMenu: [
      {
        title: "Категори",
        icon: "AppstoreOutlined",
        link: category.categories,
      },
    ],
    //  color: "#373737",
  },
  {
    title: "Багц",
    icon: "GiftOutlined",
    subMenu: [
      {
        title: "Багц",
        icon: "GiftOutlined",
        link: basePackage.packages,
      },
    ],
    //  color: "#373737",
  },
  {
    title: "Тест",
    icon: "QuestionCircleOutlined",
    subMenu: [
      {
        title: "Тест",
        icon: "FileTextOutlined",
        link: test.tests,
      },
    ],
    //  color: "#373737",
  },
];
