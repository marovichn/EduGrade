import schedule from "node-schedule";
import prisma from "@/app/libs/prismadb";

// Create a rule to run the task every day at midnight (0:00)
const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;

// Create a scheduled job
const job = schedule.scheduleJob(rule, async () => {
  await updateAssignments();
});

// Function to update assignments
async function updateAssignments() {
  const assignments = await prisma.assignment.findMany();

  if (!assignments || assignments.length === 0) {
    console.log("No assignments to update");
    return;
  }

  for (const assignment of assignments) {
    if (!assignment || !assignment.dateDue) {
      console.log("Invalid payload");
      continue;
    }

    const currentDate = new Date();
    const isMissing = currentDate > new Date(assignment.dateDue);

    await prisma.assignment.update({
      where: {
        id: assignment.id,
      },
      data: {
        isMissing: isMissing,
      },
    });
  }

  console.log("Updated successfully");
}
