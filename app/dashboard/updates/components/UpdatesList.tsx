import { BadgeCheck, BadgeX } from "lucide-react";
import { FC } from "react";

interface UpdatesListProps {
  data: any[];
}

const UpdatesList: FC<UpdatesListProps> = ({ data }) => {
  const updateDisplay = (update: any) => {
    if (update?.t === "Assignment") {
      return (
        <div className='flex items-center jutsify-between p-5 gap-y-5 gap-x-5 '>
          <div className='flex items-center justify-center flex-col h-28 p-5 bg-white rounded-xl w-28 border-2 border-black/40'>
            {new Date(update.dateStart).toDateString()}
          </div>
          <div
            className='flex items-center justify-between h-28 p-5 bg-white rounded-xl w-auto'
            style={{
              border: update.done ? "2px solid green" : " 2px solid red",
              borderLeft: update.done ? "6px solid green" : " 6px solid red",
            }}
          >
            <div
              className='w-10 h-2 left-[120px] z-[-1] bg-black absolute'
              style={{
                backgroundColor: update.done ? "green" : "red",
              }}
            ></div>
            {update.done === true ? (
              <BadgeCheck className='text-green-500' />
            ) : (
              <BadgeX className='text-red-500' />
            )}
          </div>
          <div
            className='flex items-center justify-center flex-col h-28 p-5 bg-white rounded-xl w-auto max-sm:h-full '
            style={{
              border: update.done ? "2px dotted green" : " 2px dotted red",
            }}
          >
            <div
              className='w-10 h-2 left-[220px] z-[-1] bg-black absolute'
              style={{
                backgroundColor: update.done ? "green" : "red",
              }}
            ></div>
            <div className='flex items-center justify-around gap-x-5 max-sm:flex-col max-sm:items-start'>
              <div className='flex flex-col items-start justify-start'>
                <h1 className='text-xl font-bold'>{update.type}</h1>
                <p>{update.description}</p>
              </div>
              <div className='w-12 h-1 bg-black rotate-90 max-sm:hidden'></div>
              <div className='flex flex-col items-start justify-start'>
                <p>Due:</p>
                <p>{new Date(update.dateDue).toDateString()}</p>
              </div>
              <div className='w-12 h-[2px] bg-black/70 rotate-90 max-sm:hidden'></div>
              <div className='pr-5'>
                <span className='text-2xl'>{update.points}</span> points
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      {data.map((update) => (
        <div className='flex flex-col gap-y-5'>{updateDisplay(update)}</div>
      ))}
    </div>
  );
};

export default UpdatesList;
