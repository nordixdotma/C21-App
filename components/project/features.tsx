import { Check } from "lucide-react"

interface ProjectFeaturesProps {
  features: string[]
  className?: string
}

export function ProjectFeatures({ features, className }: ProjectFeaturesProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold mb-6">Property Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 rounded-lg border p-3">
            <div className="rounded-full bg-primary/10 p-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

