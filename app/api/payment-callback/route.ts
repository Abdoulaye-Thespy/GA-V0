import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Payment callback received:", body)

    // Here you can verify the payment with Chapa if needed
    // For now, we'll just log it

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Payment callback error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
