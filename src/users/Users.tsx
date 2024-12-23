import { useState } from "react";
import { IconUserPlus } from "@tabler/icons-react";
import useDialogState from "@/hooks/use-dialog-state";
import { Button } from "@/components/ui/button";
import { Main } from "@/components/layout/main";
import { UsersActionDialog } from "./components/users-action-dialog";
import { columns } from "./components/users-columns";
import { UsersDeleteDialog } from "./components/users-delete-dialog";
import { UsersTable } from "./components/users-table";
import UsersContextProvider, {
  type UsersDialogType,
} from "./context/users-context";
import { User, userListSchema } from "./data/schema";
import { users } from "./data/users";

export default function Users() {

  const [currentRow, setCurrentRow] = useState<User | null>(null);
  const [open, setOpen] = useDialogState<UsersDialogType>(null);

  const userList = userListSchema.parse(users);

  return (
    <UsersContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
      <Main>
        <h1 className="text-4xl font-bold">Dynamic Contract Management Dashboard</h1>
        <br />
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Contract List</h2>
            <p className="text-muted-foreground">
              Manage your Client and their roles here.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen("add")}>
              <span>Generate New Contract</span> <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <UsersTable data={userList} columns={columns} />
        </div>
      </Main>

      <UsersActionDialog
        key="user-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />

      {
        currentRow && (
          <>
            <UsersActionDialog
              key={`user-edit-${currentRow.id}`}
              open={open === "edit"}
              onOpenChange={() => {
                setOpen("edit");
                setTimeout(() => {
                  setCurrentRow(null);
                }, 500);
              }}
              currentRow={currentRow}
            />

            <UsersDeleteDialog
              key={`user-delete-${currentRow.id}`}
              open={open === "delete"}
              onOpenChange={() => {
                setOpen("delete");
                setTimeout(() => {
                  setCurrentRow(null);
                }, 500);
              }}
              currentRow={currentRow}
            />
          </>
        )
      }
    </UsersContextProvider >
  );
}
