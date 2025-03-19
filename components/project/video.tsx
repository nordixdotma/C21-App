interface ProjectVideoProps {
  videoUrl: string
  className?: string
}

export function ProjectVideo({ videoUrl, className }: ProjectVideoProps) {
  if (!videoUrl) return null

  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold mb-6">Property Video</h2>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 hover:border-primary/50 hover:shadow-sm transition-all duration-200">
        <iframe
          src={videoUrl}
          title="Property Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  )
}

