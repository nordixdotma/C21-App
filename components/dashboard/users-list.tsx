"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Trash2, Edit, Mail, Phone, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for users
const initialUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+212 612 345 678",
    role: "client",
    status: "active",
    properties: 3,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+212 623 456 789",
    role: "client",
    status: "active",
    properties: 1,
  },
  {
    id: 3,
    name: "Mohammed Al Fasi",
    email: "mohammed.alfasi@example.com",
    phone: "+212 634 567 890",
    role: "client",
    status: "inactive",
    properties: 2,
  },
  {
    id: 4,
    name: "Fatima Zahra",
    email: "fatima.zahra@example.com",
    phone: "+212 645 678 901",
    role: "client",
    status: "active",
    properties: 0,
  },
  {
    id: 5,
    name: "Robert Chen",
    email: "robert.chen@example.com",
    phone: "+212 656 789 012",
    role: "agent",
    status: "active",
    properties: 12,
  },
]

export function UsersList() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "client",
    status: "active",
  })

  const router = useRouter()

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()),
  )

  const handleAddUser = () => {
    const id = Math.max(...users.map((user) => user.id)) + 1
    setUsers([...users, { ...newUser, id, properties: 0 }])
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "client",
      status: "active",
    })
    setIsAddUserOpen(false)
  }

  const handleEditUser = () => {
    setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)))
    setIsEditUserOpen(false)
  }

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const viewUserDetails = (id: number) => {
    router.push(`/dashboard/users/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-typold text-2xl font-semibold">User Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account. The user will receive an email with login instructions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select value={newUser.status} onValueChange={(value) => setNewUser({ ...newUser, status: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50/50">
                <th className="px-4 py-3 text-left font-typold text-sm">Name</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Email</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Phone</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Role</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Status</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Properties</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="font-oakes">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-gray-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-gray-400" />
                      {user.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={user.role === "admin" ? "default" : user.role === "agent" ? "secondary" : "outline"}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={user.status === "active" ? "default" : "destructive"}
                      className={user.status === "active" ? "bg-green-500" : ""}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">{user.properties}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewUserDetails(user.id)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCurrentUser(user)
                          setIsEditUserOpen(true)
                        }}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and settings.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  value={currentUser.phone}
                  onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select
                  value={currentUser.role}
                  onValueChange={(value) => setCurrentUser({ ...currentUser, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={currentUser.status}
                  onValueChange={(value) => setCurrentUser({ ...currentUser, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

