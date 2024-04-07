export interface EventSchema {
  attendeesAmout?: number;
  details: string | null;
  id: string;
  maximumAttendees: number | null;
  slug: string;
  title: string;
}

export interface AttendeeSchema {
  id: number;
  createdAt: Date;
  checkedInAt: Date | null;
  email: string;
  name: string;
}
