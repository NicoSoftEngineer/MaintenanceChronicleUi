export interface ReminderDto {
  id: string;
  description: string;
  sendAt:string;
  machineId: string;
}

export interface CreateReminderDto {
  description: string;
  date:string;
  machineId: string;
}
