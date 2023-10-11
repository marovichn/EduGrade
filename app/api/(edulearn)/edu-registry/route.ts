import prisma from "@/app/libs/prismadb";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

import Cors from "cors";
import { runMiddleware } from "@/app/helpers/runMiddleware";

// Initialize the cors middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify the allowed HTTP methods
  origin: "https://localhost:3001", // Replace with your frontend domain
});

export async function POST(request: Request, res: NextApiResponse) {
  await runMiddleware(request, res, cors);

  const { eduConnectionAccessToken } = await request.json();
  if (!eduConnectionAccessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const accessTokenValidator = process.env.EDU_CONNECTION_ACCESS_KEY;
  if (eduConnectionAccessToken !== accessTokenValidator) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const teachersData = await prisma.teacher.findMany({});
  const studentsData = await prisma.student.findMany({});
  const adminsData = await prisma.admin.findMany({});

  const registryData = {
    teachersData: teachersData,
    studentsData: studentsData,
    adminsData: adminsData,
  };
  return res.json(registryData);
}
