import { Sidebar } from "../side-bar/side-bar";

export const HOME_SIDE_BAR_CONFIG: Sidebar = {
  title: "Manage",
  alink: [
    {
      name: 'home',
      link: 'home',
      icon:'home'
    },
    {
      name: '支出記帳',
      link: 'account',
      icon:'payment'
    },
    {
      name: '飲食管理',
      link: 'eat',
      icon:'fastfood'
    },
    {
      name: '運動紀錄',
      link: 'fit',
      icon:'face'
    }
    ,
    {
      name: '筆記',
      link: 'note',
      icon:'note_add'
    }

  ]
}
