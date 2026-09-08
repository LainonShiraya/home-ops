export class CreateTaskDto {
  title: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  repetition: "NONE" | "DAILY" | "WEEKLY" | "MONTHLY";
  dueDate: string;
  assigneeId: string;
  householdId: string;
  createdBy: string;
}