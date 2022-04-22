export class Sidebar {
  title:string = 'testTitle';
  alink: alink[] = [
    {
      name:'test',
      link:'/home',
      icon:''
    },
    {
      name:'test2',
      link:'/read',
      icon:''
    }
  ];
}



export class alink {
  name:string = '';
  link:string=  '';
  icon:string=  '';
}
