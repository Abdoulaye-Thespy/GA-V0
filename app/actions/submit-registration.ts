"use server"

export async function submitRegistration(formData: FormData) {
  const studentName = formData.get("student_name") as string
  const grade = formData.get("grade") as string
  const parentName = formData.get("parent_name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const message = (formData.get("message") as string) || ""

  console.log("Server action called with data:", {
    studentName,
    grade,
    parentName,
    email,
    phone,
    message,
  })

  // Validate required fields
  if (!studentName || !grade || !parentName || !email || !phone) {
    console.log("Validation failed - missing required fields")
    return {
      success: false,
      message: "Please fill in all required fields.",
    }
  }

  // Use environment variables from Vercel integration
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables")
    return {
      success: false,
      message: "Database configuration error. Please contact support.",
    }
  }

  const apiKey = supabaseServiceKey || supabaseAnonKey

  try {
    // First, let's check what columns exist in the table
    console.log("Checking table schema...")
    const schemaResponse = await fetch(`${supabaseUrl}/rest/v1/registrations?limit=0`, {
      method: "GET",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (schemaResponse.ok) {
      console.log("Table exists and is accessible")
    } else {
      const schemaError = await schemaResponse.text()
      console.log("Schema check error:", schemaError)
    }

    // Try different possible column name combinations
    const possibleDataFormats = [
      // Format 1: snake_case (our current format)
      {
        student_name: studentName,
        grade: grade,
        parent_name: parentName,
        email: email,
        phone: phone,
        message: message,
      },
      // Format 2: camelCase
      {
        studentName: studentName,
        grade: grade,
        parentName: parentName,
        email: email,
        phone: phone,
        message: message,
      },
      // Format 3: Different field names
      {
        name: studentName,
        grade: grade,
        parent: parentName,
        email: email,
        phone: phone,
        comments: message,
      },
      // Format 4: More common field names
      {
        student: studentName,
        grade_level: grade,
        guardian: parentName,
        email_address: email,
        phone_number: phone,
        additional_info: message,
      },
    ]

    let lastError = null

    // Try each format until one works
    for (let i = 0; i < possibleDataFormats.length; i++) {
      const registrationData = possibleDataFormats[i]
      console.log(`Attempting format ${i + 1}:`, registrationData)

      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/registrations`, {
          method: "POST",
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(registrationData),
        })

        console.log(`Format ${i + 1} response:`, {
          status: response.status,
          statusText: response.statusText,
        })

        if (response.ok) {
          console.log(`Successfully submitted with format ${i + 1}`)
          return {
            success: true,
            message: "Registration submitted successfully! We'll contact you within 24-48 hours.",
          }
        } else {
          const errorText = await response.text()
          console.log(`Format ${i + 1} failed:`, errorText)
          lastError = errorText

          // If it's not a column issue, break early
          if (!errorText.includes("column") && !errorText.includes("schema")) {
            break
          }
        }
      } catch (formatError) {
        console.log(`Format ${i + 1} network error:`, formatError)
        lastError = formatError
      }
    }

    // If all formats failed, return the last error
    let errorMessage = "Failed to submit registration. Database schema mismatch."

    if (lastError) {
      try {
        const errorData = typeof lastError === "string" ? JSON.parse(lastError) : lastError
        if (errorData.message) {
          if (errorData.message.includes("row-level security")) {
            errorMessage = "Database access denied. Please contact support."
          } else if (errorData.message.includes("relation") && errorData.message.includes("does not exist")) {
            errorMessage = "The registrations table does not exist."
          } else {
            errorMessage = `Database error: ${errorData.message}`
          }
        }
      } catch (parseError) {
        console.log("Could not parse final error")
      }
    }

    return {
      success: false,
      message: errorMessage,
    }
  } catch (error) {
    console.error("Network/fetch error:", error)
    return {
      success: false,
      message: `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
