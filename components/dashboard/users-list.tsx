"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, UserPlus, Upload, Eye, EyeOff, Copy, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface User {
  id: string
  name: string
  username: string
  email: string
  password: string
  hashedPassword?: string
  role: string
  image?: string
  phone?: string
  createdAt?: string
}

// Simple hash function for demonstration purposes
const hashPassword = (password: string): string => {
  return Array.from(password)
    .map((char) => "*")
    .join("")
}

export function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    role: "client",
    image: "",
    phone: "",
  })
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string>("")
  const [visiblePasswordIds, setVisiblePasswordIds] = useState<string[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  // Save users to localStorage whenever the users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  }, [users])

  const handleAddUser = () => {
    if (!newUser.name || !newUser.username || !newUser.email || !newUser.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const userWithId = {
      ...newUser,
      id: Date.now().toString(),
      image: profileImagePreview || `/placeholder.svg?height=200&width=200`,
      hashedPassword: hashPassword(newUser.password),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setUsers((prevUsers) => [...prevUsers, userWithId])
    setNewUser({
      id: "",
      name: "",
      username: "",
      email: "",
      password: "",
      role: "client",
      image: "",
      phone: "",
    })
    setProfileImage(null)
    setProfileImagePreview("")
    setIsAddDialogOpen(false)

    toast({
      title: "User added",
      description: `${userWithId.name} has been added successfully.`,
    })
  }

  const handleEditUser = () => {
    if (!selectedUser || !selectedUser.name || !selectedUser.username || !selectedUser.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id
          ? {
              ...selectedUser,
              image: profileImagePreview || selectedUser.image,
              hashedPassword: selectedUser.password ? hashPassword(selectedUser.password) : user.hashedPassword,
            }
          : user,
      ),
    )
    setSelectedUser(null)
    setProfileImage(null)
    setProfileImagePreview("")
    setIsEditDialogOpen(false)

    toast({
      title: "User updated",
      description: `${selectedUser.name} has been updated successfully.`,
    })
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return

    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id))
    setSelectedUser(null)
    setIsDeleteDialogOpen(false)

    toast({
      title: "User deleted",
      description: `${selectedUser.name} has been deleted successfully.`,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImage(file)

      // Convert to data URL for preview and storage
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImagePreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const togglePasswordVisibility = (userId: string) => {
    if (visiblePasswordIds.includes(userId)) {
      setVisiblePasswordIds(visiblePasswordIds.filter((id) => id !== userId))
    } else {
      setVisiblePasswordIds([...visiblePasswordIds, userId])
    }
  }

  const copyToClipboard = (text: string, userId: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedId(userId)
        toast({
          title: "Password copied",
          description: "Password has been copied to clipboard.",
        })

        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopiedId(null)
        }, 2000)
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          title: "Copy failed",
          description: "Failed to copy password to clipboard.",
          variant: "destructive",
        })
      },
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:max-w-sm"
          />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Add a new user to the system.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-image">Profile Image</Label>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200">
                      {profileImagePreview ? (
                        <img
                          src={profileImagePreview || "/placeholder.svg"}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                          <span className="text-3xl">?</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="profile-upload"
                        className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 px-3 py-2 hover:bg-gray-50"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Image
                      </Label>
                      <Input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">
                    Username <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="text"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newUser.phone || ""}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">
                    Role <span className="text-red-500">*</span>
                  </Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {users.length === 0 ? (
        <Alert>
          <AlertDescription>No users found. Click the "Add User" button to create your first user.</AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Mobile card view */}
          <div className="md:hidden space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <img
                        src={user.image || `/placeholder.svg?height=40&width=40`}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.username}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      user.role === "agent"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Email:</span> {user.email}
                  </div>
                  {user.phone && (
                    <div>
                      <span className="text-gray-500">Phone:</span> {user.phone}
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500">Password:</span>{" "}
                    <div className="inline-flex items-center space-x-1">
                      <span className="font-mono">
                        {visiblePasswordIds.includes(user.id)
                          ? user.password
                          : user.hashedPassword || hashPassword(user.password)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => togglePasswordVisibility(user.id)}
                      >
                        {visiblePasswordIds.includes(user.id) ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                        <span className="sr-only">
                          {visiblePasswordIds.includes(user.id) ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(user.password, user.id)}
                      >
                        {copiedId === user.id ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span className="sr-only">Copy password</span>
                      </Button>
                    </div>
                  </div>
                  {user.createdAt && (
                    <div>
                      <span className="text-gray-500">Created:</span> {user.createdAt}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-end gap-2 border-t pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user)
                      setProfileImagePreview(user.image || "")
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user)
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table view */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <img
                            src={user.image || `/placeholder.svg?height=40&width=40`}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || "-"}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono">
                          {visiblePasswordIds.includes(user.id)
                            ? user.password
                            : user.hashedPassword || hashPassword(user.password)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => togglePasswordVisibility(user.id)}
                        >
                          {visiblePasswordIds.includes(user.id) ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {visiblePasswordIds.includes(user.id) ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => copyToClipboard(user.password, user.id)}
                        >
                          {copiedId === user.id ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                          <span className="sr-only">Copy password</span>
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          user.role === "agent"
                            ? "bg-blue-100 text-blue-800"
                            : user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{user.createdAt || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user)
                            setProfileImagePreview(user.image || "")
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-profile-image">Profile Image</Label>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200">
                    {profileImagePreview || selectedUser.image ? (
                      <img
                        src={profileImagePreview || selectedUser.image || "/placeholder.svg"}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                        <span className="text-3xl">?</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="edit-profile-upload"
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 px-3 py-2 hover:bg-gray-50"
                    >
                      <Upload className="h-4 w-4" />
                      Change Image
                    </Label>
                    <Input
                      id="edit-profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-username">
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-username"
                  value={selectedUser.username}
                  onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-password"
                  type="text"
                  value={selectedUser.password}
                  onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={selectedUser.phone || ""}
                  onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">
                  Role <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p>
                You are about to delete <strong>{selectedUser.name}</strong> ({selectedUser.email}).
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
