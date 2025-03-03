import { Award, Clock, Percent, TrendingUp } from "lucide-react"

export function SellInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-typold text-2xl md:text-3xl font-bold mb-6">Why Sell with CENTURY 21?</h2>
        <p className="text-gray-600 mb-8">
          With over 15 years of experience in Marrakech's real estate market, we provide expert guidance and support
          throughout your selling journey. Our proven track record and extensive network ensure you get the best value
          for your property.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-typold font-semibold text-lg">Maximum Value</h3>
            <p className="text-gray-600 mt-1">
              Our expert valuation ensures you get the best price for your property in the current market.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-typold font-semibold text-lg">Quick Sale</h3>
            <p className="text-gray-600 mt-1">
              With our extensive network of qualified buyers, we can help you sell your property faster.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-typold font-semibold text-lg">Professional Service</h3>
            <p className="text-gray-600 mt-1">
              Our experienced team handles all aspects of the sale, from marketing to paperwork and negotiations.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Percent className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-typold font-semibold text-lg">Competitive Commission</h3>
            <p className="text-gray-600 mt-1">
              We offer competitive commission rates with no upfront fees. You only pay when your property sells.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-typold text-xl font-bold mb-4">Our Success Rate</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary mb-2">95%</p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary mb-2">30 Days</p>
            <p className="text-sm text-gray-600">Average Sale Time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

