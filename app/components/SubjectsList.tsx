import { Admin, Student, Subject, Teacher } from "@prisma/client";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Book, BookPlus, FileEdit } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import PageWrapper from "./PageWrapper";

interface subjectsListProps {
  subjects?: Subject[] | null | undefined;
}

const subjectsList: FC<subjectsListProps> = ({ subjects }) => {
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [indexedSubjects, setindexedSubjects] = useState<Subject[]>();

  useEffect(() => {
    if (subjects) {
      const newEndIndex = startIndex + 5;
      setEndIndex(newEndIndex);
      setindexedSubjects(subjects.slice(startIndex, newEndIndex));
    }
  }, [startIndex, subjects]);

  const next = () => {
    if (page < Math.ceil(subjects?.length! / 5)) {
      setPage((p) => p + 1);
      setStartIndex((p) => p + 5);
      setEndIndex((p) => p + 5);
    }
  };

  const previous = () => {
    if (page > 1) {
      setPage((p) => p - 1);
      setStartIndex((p) => p - 5);
      setEndIndex((p) => p - 5);
    }
  };

  return (
    <PageWrapper>
      <div className=''>
        <div className='mb-16 text-4xl font-bold flex items-center justify-between'>
          <h1>All Subjects on EduGrade:</h1>
          <Link
            href={`subjects/create`}
            className='w-12 h-12 bg-yellow-300 flex items-center justify-center rounded-lg hover:bg-yellow-200 pl-1'
          >
            <BookPlus />
          </Link>
        </div>
        {indexedSubjects?.map((subject, index) => (
          <Link
            href={`/dashboard/subjects/${subject.id}`}
            className='w-full h-20 flex justify-center items-center my-4 group '
            key={subject.name}
          >
            <div
              className={`bg-gray-400 w-8 h-full rounded-lg mr-3 flex items-center justify-center`}
            >
              <h1 className='text-white font-extrabold'>{index + 1}.</h1>
            </div>
            <div
              className={`flex items-center justify-between bg-gray-400 w-full h-full rounded-lg px-4 hover:bg-gray-400`}
              style={{ backgroundColor: subject.color!, opacity: "70%" }}
            >
              <div className='flex items-center justify-around gap-x-3'>
                <div className='flex justify-center items-center w-10 h-10 bg-gray-300/60 rounded-lg'>
                  <Book className='text-white' />
                </div>
                <h1 className='text-xl font-bold text-white'>{subject.name}</h1>
              </div>
              <div>
                <FileEdit className='text-white group-hover:animate-pulse transition group-hover:scale-125 mr-2' />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className='w-full mt-10 mb-16'>
        <div className='flex items-center justify-center gap-x-10'>
          <div className='flex items-center justify-center gap-x-10 bg-gray-200 p-3 rounded-xl'>
            <div
              className='w-8 h-8 bg-gray-400 flex items-center justify-center rounded-full hover:bg-gray-300'
              onClick={() => previous()}
            >
              <ArrowLeft className='hover:animate-pulse' />
            </div>
            <h1 className='font-bold'>
              {page} / {Math.ceil(subjects?.length! / 5)}
            </h1>
            <div
              className='w-8 h-8 bg-gray-400 flex items-center justify-center rounded-full hover:bg-gray-300'
              onClick={() => next()}
            >
              <ArrowRight className='hover:animate-pulse' />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default subjectsList;
