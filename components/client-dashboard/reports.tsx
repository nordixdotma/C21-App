import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ThumbsUp, ThumbsDown } from "lucide-react"

// Mock data for visit reports
const visitReports = [
  {
    id: 1,
    property: "Hivernage Villa",
    date: new Date(2025, 2, 5, 10, 0), // March 5, 2025, 10:00 AM
    agent: "Robert Chen",
    visitor: "Mr. and Mrs. Thompson",
    feedback: "Very interested in the property. Liked the garden and pool area. Had concerns about the kitchen size.",
    impression: "positive",
    notes: "Potential offer expected within a week. Follow-up scheduled.",
  },
  {
    id: 2,
    property: "Gueliz Apartment",
    date: new Date(2025, 2, 10, 14, 0), // March 10, 2025, 2:00 PM
    agent: "Sarah Johnson",
    visitor: "Mr. Ahmed Hassan",
    feedback:
      "Liked the location but found the apartment too small for his needs. Price point was higher than expected.",
    impression: "neutral",
    notes: "Not likely to proceed with this property. Recommended alternative options.",
  },
  {
    id: 3,
    property: "Palm Grove Apartment",
    date: new Date(2025, 1, 25, 11, 0), // February 25, 2025, 11:00 AM
    agent: "Mohammed Al Fasi",
    visitor: "Ms. Laura Smith",
    feedback: "Very enthusiastic about the property. Loved the view and modern finishes. Ready to proceed.",
    impression: "positive",
    notes: "Requested second viewing with family members. High probability of offer.",
  },
  {
    id: 4,
    property: "Hivernage Villa",
    date: new Date(2025, 1, 15, 15, 30), // February 15, 2025, 3:30 PM
    agent: "Sarah Johnson",
    visitor: "Mr. James Wilson",
    feedback: "Found the property overpriced. Had concerns about the neighborhood and proximity to schools.",
    impression: "negative",
    notes: "Not interested in pursuing further. Requested information about other areas.",
  },
]

export function ClientReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-typold text-2xl font-semibold">Property Visit Reports</h2>
      </div>

      <div className="space-y-6">
        {visitReports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{report.property}</CardTitle>
                <Badge
                  className={
                    report.impression === "positive"
                      ? "bg-green-500"
                      : report.impression === "neutral"
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }
                >
                  {report.impression.charAt(0).toUpperCase() + report.impression.slice(1)} Impression
                </Badge>
              </div>
              <CardDescription>
                Visit report from{" "}
                {report.date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Visit Date & Time</p>
                    <p className="text-sm text-gray-500">
                      {report.date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" at "}
                      {report.date.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Agent</p>
                    <p className="text-sm text-gray-500">{report.agent}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Visitor</h3>
                  <p className="text-sm text-gray-700">{report.visitor}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Visitor Feedback</h3>
                  <p className="text-sm text-gray-700">{report.feedback}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Agent Notes</h3>
                  <p className="text-sm text-gray-700">{report.notes}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {report.impression === "positive" ? (
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                  ) : report.impression === "negative" ? (
                    <ThumbsDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <div className="flex">
                      <ThumbsUp className="h-4 w-4 text-amber-500" />
                      <ThumbsDown className="h-4 w-4 text-amber-500" />
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  Overall impression: {report.impression.charAt(0).toUpperCase() + report.impression.slice(1)}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

