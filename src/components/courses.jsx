import React from 'react';

const CourseList = ({ courses, onAddCourse }) => (
    <div className="flex-grow overflow-y-auto px-4 py-2 space-y-2">
          {courses.map((course, index) => (
            <div
              key={index}
              className="flex items-center bg-darkGray rounded-lg p-2 text-white"
            >
              <div className="flex-grow">
                <div className="text-lg font-semibold">{course.name}</div>
                <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-green h-2.5 rounded-full" style={{ width: course.progress }}></div>
                </div>
              </div>
            </div>
          ))}
      <button
        className="w-full flex items-center justify-center bg-green text-white text-lg font-semibold rounded-lg py-2"
        onClick={onAddCourse}
      >
        Add Course
      </button>
    </div>
  );

export default CourseList;