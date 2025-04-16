"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Import the tracking functions
import { getPropertyViews, getPropertyContacts } from "@/lib/view-tracker"

export function DashboardCharts() {
  const [timeframe, setTimeframe] = useState("monthly")
  const [salesData, setSalesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [chartData, setChartData] = useState({
    propertyViews: 0,
    contactRequests: 0,
    totalListings: 0,
    activeListings: 0,
    soldProperties: 0,
    rentedProperties: 0,
    monthlyViews: [],
    monthlyContacts: [],
  })

  useEffect(() => {
    // Load projects from localStorage and generate chart data
    const generateChartData = () => {
      try {
        const storedProjects = localStorage.getItem("projects")
        const storedUsers = localStorage.getItem("users")

        if (!storedProjects || !storedUsers) {
          return generateMockData()
        }

        const projects = JSON.parse(storedProjects)
        const users = JSON.parse(storedUsers)

        // Count clients
        const clientCount = users.filter((user) => user.role === "client").length

        // Generate data based on projects
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth()

        // Monthly data
        const monthlyData = Array(12)
          .fill(0)
          .map((_, index) => {
            const month = new Date(currentYear, index).toLocaleString("default", { month: "short" })

            // Count projects created in this month (mock creation date based on ID for demo)
            const monthProjects = projects.filter((project) => {
              // For demo purposes, distribute projects across months based on ID
              const projectMonth = Number.parseInt(project.id) % 12
              return projectMonth === index
            })

            // Calculate total sales value for the month
            const sales = monthProjects.reduce((total, project) => {
              return total + (Number.parseInt(project.price) || 0) / 1000 // Convert to thousands
            }, 0)

            // Assign clients based on month (for demo)
            const clients = index === currentMonth ? clientCount : Math.floor(((clientCount / 12) * (index + 1)) / 12)

            return {
              month,
              sales: Math.round(sales || index * 10 + 40), // Fallback to mock data if no sales
              clients: clients || Math.floor(index / 2) + 2, // Fallback to mock data if no clients
            }
          })

        // Quarterly data
        const quarterlyData = [
          {
            quarter: "Q1",
            sales: monthlyData.slice(0, 3).reduce((sum, item) => sum + item.sales, 0),
            clients: monthlyData.slice(0, 3).reduce((sum, item) => sum + item.clients, 0),
          },
          {
            quarter: "Q2",
            sales: monthlyData.slice(3, 6).reduce((sum, item) => sum + item.sales, 0),
            clients: monthlyData.slice(3, 6).reduce((sum, item) => sum + item.clients, 0),
          },
          {
            quarter: "Q3",
            sales: monthlyData.slice(6, 9).reduce((sum, item) => sum + item.sales, 0),
            clients: monthlyData.slice(6, 9).reduce((sum, item) => sum + item.clients, 0),
          },
          {
            quarter: "Q4",
            sales: monthlyData.slice(9, 12).reduce((sum, item) => sum + item.sales, 0),
            clients: monthlyData.slice(9, 12).reduce((sum, item) => sum + item.clients, 0),
          },
        ]

        // Yearly data (simulate 5 years)
        const yearlyData = Array(5)
          .fill(0)
          .map((_, index) => {
            const year = (currentYear - 4 + index).toString()
            // More recent years have more data
            const factor = 0.5 + (index / 4) * 0.5
            return {
              year,
              sales: Math.round(quarterlyData.reduce((sum, item) => sum + item.sales, 0) * factor),
              clients: Math.round(quarterlyData.reduce((sum, item) => sum + item.clients, 0) * factor),
            }
          })

        return {
          monthly: monthlyData,
          quarterly: quarterlyData,
          yearly: yearlyData,
        }
      } catch (error) {
        console.error("Error generating chart data:", error)
        return generateMockData()
      }
    }

    const generateMockData = () => {
      // Fallback to mock data if localStorage data is not available
      const monthlySalesData = [
        { month: "Jan", sales: 65, clients: 4 },
        { month: "Feb", sales: 59, clients: 3 },
        { month: "Mar", sales: 80, clients: 5 },
        { month: "Apr", sales: 81, clients: 6 },
        { month: "May", sales: 56, clients: 2 },
        { month: "Jun", sales: 55, clients: 3 },
        { month: "Jul", sales: 40, clients: 2 },
        { month: "Aug", sales: 70, clients: 4 },
        { month: "Sep", sales: 90, clients: 7 },
        { month: "Oct", sales: 110, clients: 8 },
        { month: "Nov", sales: 95, clients: 6 },
        { month: "Dec", sales: 120, clients: 9 },
      ]

      const quarterlySalesData = [
        { quarter: "Q1", sales: 204, clients: 12 },
        { quarter: "Q2", sales: 192, clients: 11 },
        { quarter: "Q3", sales: 200, clients: 13 },
        { quarter: "Q4", sales: 325, clients: 23 },
      ]

      const yearlySalesData = [
        { year: "2020", sales: 780, clients: 45 },
        { year: "2021", sales: 850, clients: 52 },
        { year: "2022", sales: 920, clients: 58 },
        { year: "2023", sales: 980, clients: 63 },
        { year: "2024", sales: 921, clients: 59 },
      ]

      return {
        monthly: monthlySalesData,
        quarterly: quarterlySalesData,
        yearly: yearlySalesData,
      }
    }

    const data = generateChartData()
    setSalesData(data)
    setIsLoading(false)
  }, [])

  // Find the useEffect that loads data and update it to use real data
  // Look for the useEffect that sets chartData and update it:

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      const projects = JSON.parse(savedProjects)

      // Calculate real metrics
      let totalViews = 0
      let totalContacts = 0

      projects.forEach((project) => {
        totalViews += getPropertyViews(project.id)
        totalContacts += getPropertyContacts(project.id)
      })

      // Calculate other metrics based on real data
      const totalProjects = projects.length
      const activeProjects = projects.filter((p) => p.status === "available").length
      const soldProjects = projects.filter((p) => p.status === "sold").length
      const rentedProjects = projects.filter((p) => p.status === "rented").length

      // Update chart data with real metrics
      setChartData({
        propertyViews: totalViews,
        contactRequests: totalContacts,
        totalListings: totalProjects,
        activeListings: activeProjects,
        soldProperties: soldProjects,
        rentedProperties: rentedProjects,
        // Keep the monthly data for now
        monthlyViews: [120, 150, 200, 180, 250, 300, 280, 350, 400, 420, 380, 450],
        monthlyContacts: [20, 25, 30, 28, 40, 45, 50, 55, 60, 65, 58, 70],
      })
    }
  }, [])

  const getSalesData = () => {
    if (isLoading || !salesData) {
      return []
    }

    switch (timeframe) {
      case "quarterly":
        return salesData.quarterly || []
      case "yearly":
        return salesData.yearly || []
      case "monthly":
      default:
        return salesData.monthly || []
    }
  }

  const getXAxisKey = () => {
    switch (timeframe) {
      case "quarterly":
        return "quarter"
      case "yearly":
        return "year"
      case "monthly":
      default:
        return "month"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-typold text-xl md:text-2xl font-semibold">Dashboard Overview</h2>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sales">Sales Performance</TabsTrigger>
          <TabsTrigger value="clients">Client Acquisition</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Sales Performance</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                {timeframe === "monthly" && "Monthly sales performance for the current year"}
                {timeframe === "quarterly" && "Quarterly sales performance for the current year"}
                {timeframe === "yearly" && "Yearly sales performance over the past 5 years"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getSalesData()} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={getXAxisKey()} />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} MAD (thousands)`} />
                    <Legend />
                    <Bar dataKey="sales" name="Sales (thousands MAD)" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="clients" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Client Acquisition</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                {timeframe === "monthly" && "Monthly new client acquisition for the current year"}
                {timeframe === "quarterly" && "Quarterly new client acquisition for the current year"}
                {timeframe === "yearly" && "Yearly new client acquisition over the past 5 years"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getSalesData()} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={getXAxisKey()} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="clients" name="New Clients" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
