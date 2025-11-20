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
        label: 'Engineering',
        icon: 'pi pi-cog',
        command: () => window.open("https://heavydriver.app/engineering", "_blank")
      },
      {
        label: 'FAQ',
        icon: 'pi pi-question-circle',
        command: () => navigate('/faq')
      },
      {
        label: '404',
        icon: 'pi pi-times-circle',
        command: () => navigate('/404')
      },
    ]
  },
  {
    label: 'About',
    icon: 'pi pi-car',
    command: () => navigate('/about')
  },
  {
    label: 'Contact',
    icon: 'pi pi-user',
    command: () => navigate('/contact-us')
  }
];
