/* eslint-disable no-console */
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUsersContext } from '../context/users-context'
import { User } from '../data/schema'

const apiUrl = 'https://6773f19b77a26d4701c6cb32.mockapi.io/users'

interface DataTableRowActionsProps {
  row: Row<User>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useUsersContext()

  const editUser = async (userId: string, updatedData: Partial<User>) => {
    try {
      const response = await fetch(`${apiUrl}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
      const result = await response.json()
      console.log('User updated:', result)
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`${apiUrl}/${userId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        console.log('User deleted successfully')
      } else {
        console.error('Error deleting user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('edit')
            editUser(row.original.id, { firstName: 'New Name' })
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <IconEdit size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('delete')
            deleteUser(row.original.id)
          }}
          className='!text-red-500'
        >
          Delete
          <DropdownMenuShortcut>
            <IconTrash size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}