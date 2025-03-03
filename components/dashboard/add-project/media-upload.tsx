"use client"

import type React from "react"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

interface MediaUploadProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function MediaUpload({ data, updateData, onNext, onBack }: MediaUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      updateData({ images: [...data.images, ...acceptedFiles] })
    },
    [data.images, updateData],
  )

  const removeImage = (index: number) => {
    const newImages = [...data.images]
    newImages.splice(index, 1)
    updateData({ images: newImages })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 50,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (data.images.length === 0) {
      alert("Please upload at least one image")
      return
    }
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>
            Images ({data.images.length} / 50) <span className="text-red-500">*</span>
          </Label>
          <div
            {...getRootProps()}
            className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragActive ? "border-primary bg-primary/10" : "border-gray-700 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} required={data.images.length === 0} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-300">Drag and drop images here, or click to select files</p>
            <p className="mt-1 text-xs text-gray-500">(Minimum size 1440x900)</p>
          </div>
          {data.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {data.images.map((file: File, index: number) => (
                <div key={index} className="group relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="videoUrl">Video URL</Label>
          <Input
            id="videoUrl"
            value={data.videoUrl}
            onChange={(e) => updateData({ videoUrl: e.target.value })}
            placeholder="YouTube or Vimeo URL"
            className="border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <p className="mt-1 text-xs text-gray-400">YouTube, Vimeo, SWF File and MOV File are supported</p>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onBack} className="border-gray-700 hover:bg-gray-100">
          Back
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Next
        </Button>
      </div>
    </form>
  )
}

