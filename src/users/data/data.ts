import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'

export const callTypes = [
  {
    label: 'Active',
    value: 'active',

  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
  {
    label: 'Invited',
    value: 'invited',
  },
  {
    label: 'Suspended',
    value: 'suspended',
  },
  ] as const

export const userTypes = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: IconShield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: 'Manager',
    value: 'manager',
    icon: IconUsersGroup,
  },
  {
    label: 'Cashier',
    value: 'cashier',
    icon: IconCash,
  },
] as const
