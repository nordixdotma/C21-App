import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const reportId = params.id

    // Get report details
    const reportQuery = `
      SELECT 
        r.report_id as id,
        r.visit_date as visitDate,
        r.visitor_name as visitorName,
        r.visitor_contact as visitorContact,
        r.impression,
        r.feedback,
        r.notes,
        r.status,
        r.created_at as date,
        p.project_id as propertyId,
        p.name as propertyName,
        p.address as propertyAddress,
        c.user_id as clientId,
        CONCAT(c.first_name, ' ', c.last_name) as clientName,
        ag.user_id as agentId,
        CONCAT(ag.first_name, ' ', ag.last_name) as agentName
      FROM property_reports r
      JOIN projects p ON r.project_id = p.project_id
      JOIN users c ON r.client_id = c.user_id
      JOIN users ag ON r.agent_id = ag.user_id
      WHERE r.report_id = ?
    `

    const reports = await query(reportQuery, [reportId])

    if (reports.length === 0) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    const report = reports[0]

    // Check if user has access to this report
    if (user.role !== "admin" && user.id !== report.clientId && user.id !== report.agentId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error("Error fetching report:", error)
    return NextResponse.json({ error: "An error occurred while fetching report" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    if (!user || (user.role !== "admin" && user.role !== "agent")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const reportId = params.id
    const body = await request.json()
    const { visitDate, visitorName, visitorContact, impression, feedback, notes, status } = body

    // Check if report exists and user has access
    const checkQuery = `
      SELECT 
        r.report_id,
        r.agent_id
      FROM property_reports r
      WHERE r.report_id = ?
    `

    const reports = await query(checkQuery, [reportId])

    if (reports.length === 0) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    const report = reports[0]

    // Check if user has access to update this report
    if (user.role !== "admin" && user.id !== report.agent_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update report
    let updateQuery = "UPDATE property_reports SET "
    const updateValues: any[] = []
    const updateFields: string[] = []

    if (visitDate !== undefined) {
      updateFields.push("visit_date = ?")
      updateValues.push(new Date(visitDate))
    }

    if (visitorName !== undefined) {
      updateFields.push("visitor_name = ?")
      updateValues.push(visitorName)
    }

    if (visitorContact !== undefined) {
      updateFields.push("visitor_contact = ?")
      updateValues.push(visitorContact)
    }

    if (impression !== undefined) {
      updateFields.push("impression = ?")
      updateValues.push(impression)
    }

    if (feedback !== undefined) {
      updateFields.push("feedback = ?")
      updateValues.push(feedback)
    }

    if (notes !== undefined) {
      updateFields.push("notes = ?")
      updateValues.push(notes)
    }

    if (status !== undefined) {
      updateFields.push("status = ?")
      updateValues.push(status)
    }

    if (updateFields.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    updateQuery += updateFields.join(", ")
    updateQuery += " WHERE report_id = ?"
    updateValues.push(reportId)

    await query(updateQuery, updateValues)

    // Get updated report
    const updatedReportQuery = `
      SELECT 
        r.report_id as id,
        r.visit_date as visitDate,
        r.visitor_name as visitorName,
        r.visitor_contact as visitorContact,
        r.impression,
        r.feedback,
        r.notes,
        r.status,
        r.created_at as date,
        p.project_id as propertyId,
        p.name as propertyName,
        p.address as propertyAddress,
        c.user_id as clientId,
        CONCAT(c.first_name, ' ', c.last_name) as clientName,
        ag.user_id as agentId,
        CONCAT(ag.first_name, ' ', ag.last_name) as agentName
      FROM property_reports r
      JOIN projects p ON r.project_id = p.project_id
      JOIN users c ON r.client_id = c.user_id
      JOIN users ag ON r.agent_id = ag.user_id
      WHERE r.report_id = ?
    `

    const updatedReports = await query(updatedReportQuery, [reportId])
    const updatedReport = updatedReports[0]

    return NextResponse.json(updatedReport)
  } catch (error) {
    console.error("Error updating report:", error)
    return NextResponse.json({ error: "An error occurred while updating report" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    if (!user || (user.role !== "admin" && user.role !== "agent")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const reportId = params.id

    // Check if report exists and user has access
    const checkQuery = `
      SELECT 
        r.report_id,
        r.agent_id
      FROM property_reports r
      WHERE r.report_id = ?
    `

    const reports = await query(checkQuery, [reportId])

    if (reports.length === 0) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    const report = reports[0]

    // Check if user has access to delete this report
    if (user.role !== "admin" && user.id !== report.agent_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete report
    await query("DELETE FROM property_reports WHERE report_id = ?", [reportId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting report:", error)
    return NextResponse.json({ error: "An error occurred while deleting report" }, { status: 500 })
  }
}
