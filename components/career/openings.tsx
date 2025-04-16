"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react"

// Mock data for job openings
const jobOpenings = [
  {
    id: 1,
    title: "Senior Real Estate Agent",
    department: "Sales",
    location: "Marrakech, Gueliz",
    type: "Full-time",
    description:
      "We're looking for an experienced real estate agent with a proven track record in luxury property sales to join our team.",
    requirements: [
      "Minimum 3 years of experience in real estate sales",
      "Strong network of contacts in Marrakech",
      "Excellent communication and negotiation skills",
      "Fluent in Arabic, French, and English",
    ],
    posted: "2 weeks ago",
  },
  {
    id: 2,
    title: "Property Marketing Specialist",
    department: "Marketing",
    location: "Marrakech, Hivernage",
    type: "Full-time",
    description:
      "Join our marketing team to create compelling content and strategies that showcase our exclusive property listings.",
    requirements: [
      "Experience in digital marketing, preferably in real estate",
      "Strong photography and content creation skills",
      "Knowledge of SEO and social media marketing",
      "Fluent in French and English",
    ],
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Real Estate Administrator",
    department: "Operations",
    location: "Marrakech, Gueliz",
    type: "Full-time",
    description:
      "Support our real estate operations with efficient administrative processes and exceptional organizational skills.",
    requirements: [
      "Previous administrative experience, preferably in real estate",
      "Strong attention to detail and organizational skills",
      "Proficiency in Microsoft Office and CRM systems",
      "Fluent in Arabic and French",
    ],
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Junior Real Estate Agent",
    department: "Sales",
    location: "Marrakech, Agdal",
    type: "Full-time",
    description:
      "Start your career in real estate with our comprehensive training program and supportive team environment.",
    requirements: [
      "Bachelor's degree in business, marketing, or related field",
      "Strong interpersonal and communication skills",
      "Eagerness to learn and grow in the real estate industry",
      "Fluent in Arabic and French, English is a plus",
    ],
    posted: "5 days ago",
  },
]

export function CareerOpenings() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  const toggleJobDetails = (jobId: number) => {
    if (expandedJob === jobId) {
      setExpandedJob(null)
    } else {
      setExpandedJob(jobId)
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our current job opportunities and find the perfect role to advance your career in real estate.
          </p>
        </div>

        <div className="space-y-6">
          {jobOpenings.map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription className="mt-1">{job.department}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {job.type}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                      {job.posted}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {job.department}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                {expandedJob === job.id && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-gray-600">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="ghost" onClick={() => toggleJobDetails(job.id)}>
                  {expandedJob === job.id ? "Show Less" : "Show More"}
                </Button>
                <Button className="bg-primary hover:bg-primary/90">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
