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

    const appointmentId = params.id

    // Get appointment details
    const appointmentQuery = `
      SELECT 
        a.appointment_id as id,
        a.appointment_date as date,
        a.status,
        a.notes,
        a.created_at as createdAt,
        p.project_id as propertyId,
        p.name as propertyName,
        p.address as propertyAddress,
        c.user_id as clientId,
        CONCAT(c.first_name, ' ', c.last_name) as clientName,
        ag.user_id as agentId,
        CONCAT(ag.first_name, ' ', ag.last_name) as agentName
      FROM appointments a
      JOIN projects p ON a.project_id = p.project_id
      JOIN users c ON a.client_id = c.user_id
      JOIN users ag ON a.agent_id = ag.user_id
      WHERE a.appointment_id = ?
    `

    const appointments = await query(appointmentQuery, [appointmentId])

    if (appointments.length === 0) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    const appointment = appointments[0]

    // Check if user has access to this appointment
    if (user.role !== "admin" && user.id !== appointment.clientId && user.id !== appointment.agentId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Error fetching appointment:", error)
    return NextResponse.json({ error: "An error occurred while fetching appointment" }, { status: 500 })
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

    const appointmentId = params.id
    const body = await request.json()
    const { date, status, notes } = body

    // Check if appointment exists and user has access
    const checkQuery = `
      SELECT 
        a.appointment_id,
        a.agent_id
      FROM appointments a
      WHERE a.appointment_id = ?
    `

    const appointments = await query(checkQuery, [appointmentId])

    if (appointments.length === 0) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    const appointment = appointments[0]

    // Check if user has access to update this appointment
    if (user.role !== "admin" && user.id !== appointment.agent_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update appointment
    let updateQuery = "UPDATE appointments SET "
    const updateValues: any[] = []
    const updateFields: string[] = []

    if (date !== undefined) {
      updateFields.push("appointment_date = ?")
      updateValues.push(new Date(date))
    }

    if (status !== undefined) {
      updateFields.push("status = ?")
      updateValues.push(status)
    }

    if (notes !== undefined) {
      updateFields.push("notes = ?")
      updateValues.push(notes)
    }

    if (updateFields.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    updateQuery += updateFields.join(", ")
    updateQuery += " WHERE appointment_id = ?"
    updateValues.push(appointmentId)

    await query(updateQuery, updateValues)

    // Get updated appointment
    const updatedAppointmentQuery = `
      SELECT 
        a.appointment_id as id,
        a.appointment_date as date,
        a.status,
        a.notes,
        a.created_at as createdAt,
        p.project_id as propertyId,
        p.name as propertyName,
        p.address as propertyAddress,
        c.user_id as clientId,
        CONCAT(c.first_name, ' ', c.last_name) as clientName,
        ag.user_id as agentId,
        CONCAT(ag.first_name, ' ', ag.last_name) as agentName
      FROM appointments a
      JOIN projects p ON a.project_id = p.project_id
      JOIN users c ON a.client_id = c.user_id
      JOIN users ag ON a.agent_id = ag.user_id
      WHERE a.appointment_id = ?
    `

    const updatedAppointments = await query(updatedAppointmentQuery, [appointmentId])
    const updatedAppointment = updatedAppointments[0]

    return NextResponse.json(updatedAppointment)
  } catch (error) {
    console.error("Error updating appointment:", error)
    return NextResponse.json({ error: "An error occurred while updating appointment" }, { status: 500 })
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

    const appointmentId = params.id

    // Check if appointment exists and user has access
    const checkQuery = `
      SELECT 
        a.appointment_id,
        a.agent_id
      FROM appointments a
      WHERE a.appointment_id = ?
    `

    const appointments = await query(checkQuery, [appointmentId])

    if (appointments.length === 0) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    const appointment = appointments[0]

    // Check if user has access to delete this appointment
    if (user.role !== "admin" && user.id !== appointment.agent_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete appointment
    await query("DELETE FROM appointments WHERE appointment_id = ?", [appointmentId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting appointment:", error)
    return NextResponse.json({ error: "An error occurred while deleting appointment" }, { status: 500 })
  }
}
