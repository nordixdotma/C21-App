import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
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

    // Build query based on user role
    let reportsQuery = `
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
      WHERE 1=1
    `

    const queryParams: any[] = []

    // Filter based on user role
    if (user.role === "client") {
      reportsQuery += " AND r.client_id = ?"
      queryParams.push(user.id)
    } else if (user.role === "agent") {
      reportsQuery += " AND r.agent_id = ?"
      queryParams.push(user.id)
    }

    reportsQuery += " ORDER BY r.created_at DESC"

    const reports = await query(reportsQuery, queryParams)

    return NextResponse.json(reports)
  } catch (error) {
    console.error("Error fetching reports:", error)
    return NextResponse.json({ error: "An error occurred while fetching reports" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    if (!user || user.role !== "agent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { propertyId, clientId, visitDate, visitorName, visitorContact, impression, feedback, notes } = body

    // Validate required fields
    if (!propertyId || !clientId || !visitDate || !impression || !feedback) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert report
    const insertQuery = `
      INSERT INTO property_reports (
        project_id,
        client_id,
        agent_id,
        visit_date,
        visitor_name,
        visitor_contact,
        impression,
        feedback,
        notes,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const result = await query(insertQuery, [
      propertyId,
      clientId,
      user.id,
      new Date(visitDate),
      visitorName || null,
      visitorContact || null,
      impression,
      feedback,
      notes || null,
      "submitted",
    ])

    // Get the inserted report
    const reportId = result.insertId
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
    const report = reports[0]

    return NextResponse.json(report)
  } catch (error) {
    console.error("Error creating report:", error)
    return NextResponse.json({ error: "An error occurred while creating report" }, { status: 500 })
  }
}
