import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/complaints/complaints-list',
    label: 'Complaints',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiAlertCircle' in icon ? icon['mdiAlertCircle' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_COMPLAINTS'
  },
  {
    href: '/dashboards/dashboards-list',
    label: 'Dashboards',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiViewDashboard' in icon ? icon['mdiViewDashboard' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_DASHBOARDS'
  },
  {
    href: '/notifications/notifications-list',
    label: 'Notifications',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiBell' in icon ? icon['mdiBell' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_NOTIFICATIONS'
  },
  {
    href: '/upvotes/upvotes-list',
    label: 'Upvotes',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiThumbUp' in icon ? icon['mdiThumbUp' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_UPVOTES'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
