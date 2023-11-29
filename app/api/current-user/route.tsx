// pages/api/currentUser.js
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(currentUser);
  } catch (error) {
    console.error("Error in currentUser API route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
