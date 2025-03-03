"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

interface BasicInfoProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
}

export function BasicInfo({ data, updateData, onNext }: BasicInfoProps) {
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="">
            Property Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => updateData({ title: e.target.value })}
            required
            className="border border-gray-300"
          />
        </div>

        <div>
          <Label htmlFor="description" className="">
            Description
          </Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            rows={4}
            className="border border-gray-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type" className="">
              Type
            </Label>
            <Select value={data.type} onValueChange={(value) => updateData({ type: value })}>
              <SelectTrigger className="border border-gray-300">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="border border-gray-300">
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status" className="">
              Status
            </Label>
            <Select value={data.status} onValueChange={(value) => updateData({ status: value })}>
              <SelectTrigger className="border border-gray-300">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="border border-gray-300">
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="">Price Type</Label>
          <RadioGroup
            value={data.priceType}
            onValueChange={(value) => updateData({ priceType: value })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sale" id="sale" />
              <Label htmlFor="sale" className="">
                Sale
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rent" id="rent" />
              <Label htmlFor="rent" className="">
                Rent
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="price" className="">
            {data.priceType === "sale" ? "Sale Price" : "Rent Price"} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="price"
            type="number"
            value={data.price}
            onChange={(e) => updateData({ price: e.target.value })}
            placeholder={`Enter ${data.priceType} price`}
            required
            className="border border-gray-300"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.back()}
          className="border-gray-700 hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Next
        </Button>
      </div>
    </form>
  )
}

