import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, MousePointerClick, Calendar, FileText } from "lucide-react"

export function ClientDashboardOverview() {
  return (
    <div className="space-y-6">
      <h2 className="font-typold text-2xl font-semibold">Welcome, John Smith</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 active, 1 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Property Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Visits</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Next: Tomorrow, 3:00 PM</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Property Performance</CardTitle>
            <CardDescription>View statistics for your properties over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Property performance chart will appear here</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on your properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">New property view</p>
                  <p className="text-xs text-gray-500">Hivernage Villa • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-green-100 p-2">
                  <MousePointerClick className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Contact request</p>
                  <p className="text-xs text-gray-500">Palm Grove Apartment • Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-purple-100 p-2">
                  <Calendar className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Visit scheduled</p>
                  <p className="text-xs text-gray-500">Gueliz Apartment • 2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-amber-100 p-2">
                  <FileText className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">New visit report</p>
                  <p className="text-xs text-gray-500">Hivernage Villa • 3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Building2 } from "lucide-react"

