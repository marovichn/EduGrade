"use client";

import PageWrapper from "@/app/components/PageWrapper";
import { Calendar } from "@/app/components/ui/calendar";
import { FC, useState } from "react";

interface AddAttendanceDisplayProps {}

const AddAttendanceDisplay: FC<AddAttendanceDisplayProps> = ({}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <PageWrapper>
        <div className="flex itms-center justify-center">
        <h1 className="text-3xl font-bold">Add Attendance: </h1>
      <div className='flex flex-col items-start justify-center pt-10 w-full gap-y-6'>
        <h1>Choose Date:</h1>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='rounded-md border'
        />
      </div></div>
    </PageWrapper>
  );
};

export default AddAttendanceDisplay;
