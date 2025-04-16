// Create a utility to track and store property views

// Function to track a property view
export function trackPropertyView(propertyId: string) {
  try {
    // Get existing view data from localStorage
    const viewsData = localStorage.getItem("propertyViews")
      ? JSON.parse(localStorage.getItem("propertyViews") || "{}")
      : {}

    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]

    // Initialize structure if needed
    if (!viewsData[propertyId]) {
      viewsData[propertyId] = {
        total: 0,
        byDate: {},
      }
    }

    if (!viewsData[propertyId].byDate[today]) {
      viewsData[propertyId].byDate[today] = 0
    }

    // Increment view counts
    viewsData[propertyId].total += 1
    viewsData[propertyId].byDate[today] += 1

    // Save back to localStorage
    localStorage.setItem("propertyViews", JSON.stringify(viewsData))

    return viewsData[propertyId].total
  } catch (error) {
    console.error("Error tracking property view:", error)
    return 0
  }
}

// Function to track a contact click
export function trackContactClick(propertyId: string) {
  try {
    // Get existing contact data from localStorage
    const contactData = localStorage.getItem("propertyContacts")
      ? JSON.parse(localStorage.getItem("propertyContacts") || "{}")
      : {}

    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]

    // Initialize structure if needed
    if (!contactData[propertyId]) {
      contactData[propertyId] = {
        total: 0,
        byDate: {},
      }
    }

    if (!contactData[propertyId].byDate[today]) {
      contactData[propertyId].byDate[today] = 0
    }

    // Increment contact counts
    contactData[propertyId].total += 1
    contactData[propertyId].byDate[today] += 1

    // Save back to localStorage
    localStorage.setItem("propertyContacts", JSON.stringify(contactData))

    return contactData[propertyId].total
  } catch (error) {
    console.error("Error tracking property contact:", error)
    return 0
  }
}

// Function to get total views for a property
export function getPropertyViews(propertyId: string): number {
  try {
    const viewsData = JSON.parse(localStorage.getItem("propertyViews") || "{}")
    return viewsData[propertyId]?.total || 0
  } catch (error) {
    console.error("Error getting property views:", error)
    return 0
  }
}

// Function to get total contacts for a property
export function getPropertyContacts(propertyId: string): number {
  try {
    const contactData = JSON.parse(localStorage.getItem("propertyContacts") || "{}")
    return contactData[propertyId]?.total || 0
  } catch (error) {
    console.error("Error getting property contacts:", error)
    return 0
  }
}

// Function to get all property views for a client's properties
export function getClientPropertyViews(clientId: string): number {
  try {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]")
    const viewsData = JSON.parse(localStorage.getItem("propertyViews") || "{}")

    // Filter projects by client ID
    const clientProjects = projects.filter((project) => project.ownerId === clientId)

    // Sum up views for all client projects
    let totalViews = 0
    clientProjects.forEach((project) => {
      totalViews += viewsData[project.id]?.total || 0
    })

    return totalViews
  } catch (error) {
    console.error("Error getting client property views:", error)
    return 0
  }
}

// Function to get all property contacts for a client's properties
export function getClientPropertyContacts(clientId: string): number {
  try {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]")
    const contactData = JSON.parse(localStorage.getItem("propertyContacts") || "{}")

    // Filter projects by client ID
    const clientProjects = projects.filter((project) => project.ownerId === clientId)

    // Sum up contacts for all client projects
    let totalContacts = 0
    clientProjects.forEach((project) => {
      totalContacts += contactData[project.id]?.total || 0
    })

    return totalContacts
  } catch (error) {
    console.error("Error getting client property contacts:", error)
    return 0
  }
}
