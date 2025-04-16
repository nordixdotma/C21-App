"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Download, MoreHorizontal, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

interface Subscriber {
  id: string
  email: string
  name?: string
  subscriptionDate: string
  source: string
}

export function SubscribersList() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null)
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  useEffect(() => {
    // Load subscribers from localStorage
    const storedSubscribers = localStorage.getItem("subscribers")
    if (storedSubscribers) {
      setSubscribers(JSON.parse(storedSubscribers))
    } else {
      // Initialize with empty array
      setSubscribers([])
      localStorage.setItem("subscribers", JSON.stringify([]))
    }
  }, [])

  useEffect(() => {
    // Reset selected subscribers when the list changes
    setSelectedSubscribers([])
    setSelectAll(false)
  }, [subscribers])

  const handleDeleteClick = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber)
    setIsDeleteConfirmOpen(true)
  }

  const handleDeleteSubscriber = () => {
    if (!selectedSubscriber) return

    const updatedSubscribers = subscribers.filter((sub) => sub.id !== selectedSubscriber.id)
    setSubscribers(updatedSubscribers)
    localStorage.setItem("subscribers", JSON.stringify(updatedSubscribers))
    setIsDeleteConfirmOpen(false)

    toast({
      title: "Subscriber deleted",
      description: `${selectedSubscriber.email} has been removed from the list.`,
    })
  }

  const handleDeleteSelected = () => {
    if (selectedSubscribers.length === 0) return

    const updatedSubscribers = subscribers.filter((sub) => !selectedSubscribers.includes(sub.id))
    setSubscribers(updatedSubscribers)
    localStorage.setItem("subscribers", JSON.stringify(updatedSubscribers))
    setSelectedSubscribers([])

    toast({
      title: "Subscribers deleted",
      description: `${selectedSubscribers.length} subscribers have been removed from the list.`,
    })
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSubscribers([])
    } else {
      setSelectedSubscribers(filteredSubscribers.map((sub) => sub.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectSubscriber = (id: string) => {
    if (selectedSubscribers.includes(id)) {
      setSelectedSubscribers(selectedSubscribers.filter((subId) => subId !== id))
    } else {
      setSelectedSubscribers([...selectedSubscribers, id])
    }
  }

  const exportToCSV = () => {
    // Create CSV content
    const headers = ["Email", "Name", "Subscription Date", "Source"]
    const csvContent = [
      headers.join(","),
      ...subscribers.map((sub) => {
        return [
          `"${sub.email}"`,
          sub.name ? `"${sub.name}"` : '""',
          `"${sub.subscriptionDate}"`,
          `"${sub.source}"`,
        ].join(",")
      }),
    ].join("\n")

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `subscribers_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export successful",
      description: `${subscribers.length} subscribers exported to CSV.`,
    })
  }

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.name && sub.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      sub.source.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-typold text-xl md:text-2xl font-semibold">Email Subscribers</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <Input
            placeholder="Search subscribers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:max-w-sm"
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={exportToCSV} className="flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {selectedSubscribers.length > 0 && (
        <div className="bg-muted/50 p-2 rounded-md flex items-center justify-between">
          <span className="text-sm font-medium ml-2">
            {selectedSubscribers.length} {selectedSubscribers.length === 1 ? "subscriber" : "subscribers"} selected
          </span>
          <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete Selected
          </Button>
        </div>
      )}

      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {filteredSubscribers.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-center text-gray-500">No subscribers found.</div>
        ) : (
          filteredSubscribers.map((subscriber) => (
            <Card key={subscriber.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedSubscribers.includes(subscriber.id)}
                      onCheckedChange={() => handleSelectSubscriber(subscriber.id)}
                    />
                    <div>
                      <p className="font-medium">{subscriber.email}</p>
                      {subscriber.name && <p className="text-sm text-gray-500">{subscriber.name}</p>}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500"
                    onClick={() => handleDeleteClick(subscriber)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>Source: {subscriber.source}</span>
                  <span>Added: {subscriber.subscriptionDate}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No subscribers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedSubscribers.includes(subscriber.id)}
                      onCheckedChange={() => handleSelectSubscriber(subscriber.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{subscriber.email}</TableCell>
                  <TableCell>{subscriber.name || "-"}</TableCell>
                  <TableCell>{subscriber.source}</TableCell>
                  <TableCell>{subscriber.subscriptionDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDeleteClick(subscriber)} className="text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Subscriber</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this subscriber? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedSubscriber && (
              <p>
                You are about to delete <strong>{selectedSubscriber.email}</strong>
                {selectedSubscriber.name && ` (${selectedSubscriber.name})`}.
              </p>
            )}
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSubscriber} className="w-full sm:w-auto">
              Delete Subscriber
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
