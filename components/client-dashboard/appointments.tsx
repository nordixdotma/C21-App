"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, User, CalendarIcon } from "lucide-react"

export function ClientAppointments() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would load appointments from localStorage or an API
    // For now, we'll use mock data but add a loading state
    setAppointments([
      {
        id: 1,
        property: "Hivernage Villa",
        date: new Date(2025, 2, 15, 15, 0), // March 15, 2025, 3:00 PM
        agent: "Sarah Johnson",
        status: "upcoming",
        location: "Hivernage, Marrakech",
      },
      {
        id: 2,
        property: "Palm Grove Apartment",
        date: new Date(2025, 2, 18, 11, 30), // March 18, 2025, 11:30 AM
        agent: "Mohammed Al Fasi",
        status: "upcoming",
        location: "Palm Grove, Marrakech",
      },
      {
        id: 3,
        property: "Gueliz Apartment",
        date: new Date(2025, 2, 10, 14, 0), // March 10, 2025, 2:00 PM
        agent: "Sarah Johnson",
        status: "completed",
        location: "Gueliz, Marrakech",
      },
      {
        id: 4,
        property: "Hivernage Villa",
        date: new Date(2025, 2, 5, 10, 0), // March 5, 2025, 10:00 AM
        agent: "Robert Chen",
        status: "completed",
        location: "Hivernage, Marrakech",
      },
    ])
    setIsLoading(false)
  }, [])

  // Filter appointments for the selected date
  const filteredAppointments = date
    ? appointments.filter(
        (appointment) =>
          appointment.date.getDate() === date.getDate() &&
          appointment.date.getMonth() === date.getMonth() &&
          appointment.date.getFullYear() === date.getFullYear(),
      )
    : appointments

  // Get dates with appointments for highlighting in calendar
  const appointmentDates = appointments.map(
    (appointment) => new Date(appointment.date.getFullYear(), appointment.date.getMonth(), appointment.date.getDate()),
  )

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-typold text-xl md:text-2xl font-semibold mb-4 md:mb-6">My Appointments</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-typold text-lg md:text-2xl font-semibold">Property Visit Appointments</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                {date ? (
                  <>
                    Appointments for{" "}
                    {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </>
                ) : (
                  <>All Appointments</>
                )}
              </h3>
              {date && (
                <Button variant="outline" size="sm" onClick={() => setDate(undefined)}>
                  View All
                </Button>
              )}
            </div>

            {filteredAppointments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <CalendarIcon className="h-10 w-10 text-gray-300 mb-4" />
                  <p className="text-lg font-medium">No appointments found</p>
                  <p className="text-sm text-gray-500">
                    {date ? "No appointments scheduled for this date" : "You don't have any appointments yet"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {filteredAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{appointment.property}</h3>
                          <div className="flex items-center gap-2 mt-1 text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{appointment.location}</span>
                          </div>
                        </div>
                        <Badge className={appointment.status === "upcoming" ? "bg-blue-500" : "bg-green-500"}>
                          {appointment.status === "upcoming" ? "Upcoming" : "Completed"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">Date & Time</p>
                            <p className="text-sm text-gray-500">
                              {appointment.date.toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                              {" at "}
                              {appointment.date.toLocaleTimeString("en-US", {
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
                            <p className="text-sm text-gray-500">{appointment.agent}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  appointment: appointmentDates,
                }}
                modifiersStyles={{
                  appointment: {
                    fontWeight: "bold",
                    backgroundColor: "rgba(190, 175, 135, 0.2)",
                    borderRadius: "50%",
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
