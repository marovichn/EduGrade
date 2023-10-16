"use client";

import axios from "axios";
import {
  BadgeCheck,
  BadgeX,
  CheckCircle,
  Frown,
  Meh,
  Smile,
  UserCheck2,
  UserCog2,
  UserX2,
} from "lucide-react";
import { FC, useEffect } from "react";

interface UpdatesListProps {
  data: any[];
}

const UpdatesList: FC<UpdatesListProps> = ({ data }) => {
  const assignments = data.filter((a) => a.t === "Assignment");
  useEffect(() => {
    // Additional checking (node-schedule is automatically checking every 24 hours!)
    const fetchData = async () => {
      console.log(assignments);
      try {
        axios
          .post("/api/check-missing", { assignments })
          .then((res) => console.log(res));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [data, assignments]);

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
              className='w-20 h-2 left-[100px] z-[-1] bg-black absolute'
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
            className='flex items-center justify-center flex-col h-36 p-5 bg-white rounded-xl w-auto max-sm:h-full '
            style={{
              border: update.done ? "2px dotted green" : " 2px dotted red",
            }}
          >
            <div
              className='w-24 h-2 left-[190px] z-[-1] bg-black absolute'
              style={{
                backgroundColor: update.done ? "green" : "red",
              }}
            ></div>
            <div className='flex items-center justify-around gap-x-5 max-sm:flex-col max-sm:items-start'>
              <div className='flex flex-col items-start justify-start'>
                <h1 className='text-xl font-bold '>{update.type}</h1>
                <p>{update.description}</p>
              </div>
              <div className='w-12 h-1 bg-black rotate-90 max-sm:hidden'></div>
              <div className='flex flex-col items-start justify-start'>
                <p>Due:</p>
                <p>{new Date(update.dateDue).toDateString()}</p>
              </div>
              <div className='w-12 h-[2px] bg-black/70 rotate-90 max-sm:hidden '></div>
              {update.isMissing ? (
                <div className='text-2xl font-bold'>
                  Assignment Deadline Expired
                </div>
              ) : (
                <div className='pr-5'>
                  <span className='text-2xl'>{update.points}</span> points
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else if (update?.t === "Activity") {
      return (
        <div className='flex items-center jutsify-between p-5 gap-y-5 gap-x-5 '>
          <div className='flex items-center justify-center flex-col h-28 p-5 bg-white rounded-xl w-28 border-2 border-black/40'>
            {new Date(update.date).toDateString()}
          </div>
          {update.value === "<50%" ? (
            <>
              <div
                className='flex items-center justify-between h-28 p-5 bg-white rounded-xl w-auto'
                style={{
                  border: "2px solid red",
                  borderLeft: "6px solid red",
                }}
              >
                <div
                  className='w-24 h-2 left-[100px] z-[-1] bg-black absolute'
                  style={{
                    backgroundColor: "red",
                  }}
                ></div>
                <Frown className='text-red-500' size={40} />
              </div>
              <div
                className='flex items-center justify-center flex-col h-28 p-5 bg-white rounded-xl w-auto max-sm:h-full '
                style={{
                  border: "2px dotted red",
                }}
              >
                <div
                  className='w-20 h-2 left-[190px] z-[-1] bg-black absolute'
                  style={{
                    backgroundColor: "red",
                  }}
                ></div>
                <div className='flex items-center justify-around gap-x-5 max-sm:flex-col max-sm:items-start'>
                  <div className='flex flex-col items-start justify-start'>
                    <h1 className='text-xl font-bold'>{update.type}</h1>
                    <p>{update.description}</p>
                  </div>
                  <div className='w-12 h-1 bg-black rotate-90 max-sm:hidden'></div>
                  <div className='pr-5'>
                    <span className='text-2xl'>{update.value}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className='flex items-center justify-between h-28 p-5 bg-white rounded-xl w-auto'
                style={{
                  border:
                    update.value === ">80%"
                      ? "2px solid green"
                      : " 2px solid gold",
                  borderLeft:
                    update.value === ">80%"
                      ? "6px solid green"
                      : " 6px solid gold",
                }}
              >
                <div
                  className='w-20 h-2 left-[100px] z-[-1] bg-black absolute'
                  style={{
                    backgroundColor: update.value === ">80%" ? "green" : "gold",
                  }}
                ></div>
                {(update.value === ">80%") === true ? (
                  <Smile className='text-green-500' size={40} />
                ) : (
                  <Meh className='text-yellow-400' size={40} />
                )}
              </div>
              <div
                className='flex items-center justify-center flex-col h-28 p-5 bg-white rounded-xl w-auto max-sm:h-full '
                style={{
                  border:
                    update.value === ">80%"
                      ? "2px dotted green"
                      : " 2px dotted gold",
                }}
              >
                <div
                  className='w-20 h-2 left-[190px] z-[-1] bg-black absolute'
                  style={{
                    backgroundColor: update.value === ">80%" ? "green" : "gold",
                  }}
                ></div>
                <div className='flex items-center justify-around gap-x-5 max-sm:flex-col max-sm:items-start'>
                  <div className='flex flex-col items-start justify-start'>
                    <h1 className='text-xl font-bold'>{update.type}</h1>
                    <p>{update.description}</p>
                  </div>
                  <div className='w-12 h-1 bg-black rotate-90 max-sm:hidden'></div>
                  <div className='pr-5'>
                    <span className='text-2xl'>{update.value}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      );
    } else if (update.data && update.data.t === "Result") {
      return (
        <div className='flex items-center jutsify-between p-5 gap-y-5 gap-x-5 bg-transparent'>
          <div className='flex items-center justify-center flex-col h-28 p-5 bg-white rounded-xl w-28 border-2 border-black/40'>
            {new Date(update.data.date).toDateString()}
          </div>
          <div
            className='flex items-center justify-between h-28 p-5 bg-white rounded-xl w-auto'
            style={{
              border: "2px solid purple",
              borderLeft: "6px solid purple",
            }}
          >
            <div
              className='w-20 h-2 left-[100px] z-[-1] bg-black absolute'
              style={{
                backgroundColor: "purple",
              }}
            ></div>
            <CheckCircle className='text-purple-500' size={40} />
          </div>
          <div
            className='flex items-center justify-center flex-col h-28 p-5 bg-white rounded-xl w-auto max-sm:h-full '
            style={{
              border: " 2px dotted purple",
            }}
          >
            <div
              className='w-20 h-2 left-[190px] z-[-1] bg-black absolute'
              style={{
                backgroundColor: "purple",
              }}
            ></div>
            <div className='flex items-center justify-around gap-x-5 max-sm:flex-col max-sm:items-start'>
              <div className='flex flex-col items-start justify-start'>
                <h1 className='text-xl font-bold'>
                  {update.group.subject.name}
                </h1>
                <h1 className='font-semibold'>{update.data.type}</h1>
                <p className='text-xs'>{update.data.description}</p>
              </div>
              <div className='w-12 h-1 bg-black rotate-90 max-sm:hidden'></div>
              <div className='mr-5 p-[17px] px-6 bg-purple-800 rounded-full'>
                <span className='text-4xl font-bold text-white'>
                  {update.data.value}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (update.t === "Attendance") {
      return (
        <div className='flex items-center jutsify-between p-5 gap-y-5 gap-x-5 '>
          <div className='flex items-center justify-center flex-col h-28 p-5 bg-white rounded-xl w-28 border-2 border-black/40'>
            {new Date(update.date).toDateString()}
          </div>
          {update.type === "Unjustified" ? (
            <>
              <div
                className='flex items-center justify-between h-28 p-5 bg-white rounded-xl w-auto'
                style={{
                  border: "2px solid red",
                  borderLeft: "6px solid red",
                }}
              >
                <div
                  className='w-20 h-2 left-[100px] z-[-1] bg-black absolute'
                  style={{
                    backgroundColor: "red",
                  }}
                ></div>
                <UserX2 className='text-red-500' size={40} />
              </div>
              <div
                className='flex items-center justify-center flex-col h-28 p-5 bg-white rounded-xl w-auto max-sm:h-full '
                style={{
                  border: "2px dotted red",
                }}
              >
                <div
                  className='w-20 h-2 left-[190px] z-[-1] bg-black absolute'
                  style={{
                    backgroundColor: "red",
                  }}
                ></div>
                <div className='flex items-center justify-around gap-x-5 max-sm:flex-col max-sm:items-start'>
                  <div className='flex flex-col items-start justify-start'>
                    <h1 className='text-xl font-bold'>{update.type}</h1>
                    <p>{update.description}</p>
                  </div>
                  <div className='w-12 h-1 bg-black rotate-90 max-sm:hidden'></div>
                  <div className='pr-5'>
                    <span className='text-2xl'>
                      {update.numberOfClasses === 1
                        ? `1 class`
                        : `${update.numberOfClasses} classes`}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className='flex items-center justify-between h-28 p-5 bg-white rounded-xl w-auto'
                style={{
                  border:
                    update.type === "Regulated"
                      ? "2px solid green"
                      : " 2px solid gold",
                  borderLeft:
                    update.type === "Regulated"
                      ? "6px solid green"
                      : " 6px solid gold",
                }}
              >
                <div
                  className='w-20 h-2 left-[100px] z-[-1] bg-black absolute'
                  style={{
                    backgroundColor:
                      update.type === "Regulated" ? "green" : "gold",
                  }}
                ></div>
                {(update.type === "Regulated") === true ? (
                  <UserCheck2 className='text-green-500' size={40} />
                ) : (
                  <UserCog2 className='text-yellow-400' size={40} />
                )}
              </div>
              <div
                className='flex items-center justify-center flex-col h-28 p-5 bg-white rounded-xl w-auto max-sm:h-full '
                style={{
                  border:
                    update.type === "Regulated"
                      ? "2px dotted green"
                      : " 2px dotted gold",
                }}
              >
                <div
                  className='w-20 h-2 left-[190px] z-[-1] bg-black absolute'
                  style={{
                    backgroundColor:
                      update.type === "Regulated" ? "green" : "gold",
                  }}
                ></div>
                <div className='flex items-center justify-around gap-x-5 max-sm:flex-col max-sm:items-start'>
                  <div className='flex flex-col items-start justify-start'>
                    <h1 className='text-xl font-bold'>{update.type}</h1>
                    <p>{update.description}</p>
                  </div>
                  <div className='w-12 h-1 bg-black rotate-90 max-sm:hidden'></div>
                  <div className='pr-5'>
                    <span className='text-2xl'>
                      {update.numberOfClasses === 1
                        ? `1 class`
                        : `${update.numberOfClasses} classes`}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      );
    }
  };
  return (
    <>
      <div className='h-full w-full'>
        {data.map((update, index) => (
          <div key={index} className='flex flex-col gap-y-5'>
            {updateDisplay(update)}
          </div>
        ))}
        <div className='flex flex-col items-start justify-center group -mt-10 transition max-md:flex max-md:w-full max-md:items-center'>
          <div className='flex items-center justify-center bg-black/70  p-20 rounded-full gap-x-10 border-2 border-black scale-[0.2] transition'>
            <p className='w-10 h-10 bg-white rounded-full animate-bounce delay-700'></p>
            <p className='w-10 h-10 bg-white rounded-full animate-bounce delay-1000'></p>
            <p className='w-10 h-10 bg-white rounded-full animate-bounce delay-300'></p>
          </div>
          <p className='group-hover:opacity-100 opacity-0 transition relative -top-[75px] left-[110px] max-md:flex max-md:w-full max-md:items-center max-md:justify-center max-md:static max-md:-mt-[75px] max-md:pb-10'>
            You reached the end.
          </p>
        </div>
      </div>
    </>
  );
};

export default UpdatesList;
