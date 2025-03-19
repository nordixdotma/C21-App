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
          <div
            key={index}
            className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 hover:border-primary/50 hover:shadow-sm transition-all duration-200"
          >
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

