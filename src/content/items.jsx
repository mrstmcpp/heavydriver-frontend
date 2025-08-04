export const getMenuItems = (navigate) => [
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => navigate('/')
  },
  {
    label: 'Pages',
    icon: 'pi pi-compass',
    items: [
      {
        label: '404',
        icon: 'pi pi-times-circle',
        command: () => navigate('/404')
      },
      {
        label: 'FAQ',
        icon: 'pi pi-question-circle',
        command: () => navigate('/faq')
      },
      {
        label: 'Engineering',
        icon: 'pi pi-cog',
        command: () => navigate('/engineering')
      }
    ]
  },
  {
    label: 'About',
    icon: 'pi pi-car',
    command: () => navigate('/drivers')
  },
  {
    label: 'Contact',
    icon: 'pi pi-map',
    command: () => navigate('/live-tracking')
  }
];
