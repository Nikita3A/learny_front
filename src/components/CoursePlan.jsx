import React, { useState } from 'react';

const CoursePlan = ({ courseData }) => {
  // Fallback courseData in case it's not passed as a prop
  courseData = courseData || {
    sections: [
      // Your existing sections here...
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true },
          { title: "Basics", finished: true },
        ],
        completed: true,
      },
      {
        title: "Advanced Topics",
        units: [
          { title: "Deep Dive", finished: false },
          { title: "Hands-on Examples", finished: false },
        ],
        completed: false,
      },
      // More sections...
    ],
    tests: [
      { name: "Test1" },
      { name: "Test2" },
    ],
  };

  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  // Function to calculate the total completion percentage
  const calculateTotalCompletionPercentage = (sections) => {
    const totalUnits = sections.reduce((total, section) => total + section.units.length, 0);
    const completedUnits = sections.reduce(
      (total, section) => total + section.units.filter((unit) => unit.finished).length,
      0
    );
    return (completedUnits / totalUnits) * 100;
  };

  const totalCompletionPercentage = calculateTotalCompletionPercentage(courseData.sections);

  return (
    <div className="p-10 course-plan-container bg-darkGray h-full w-full rounded-2xl flex">
      {/* Progress Bar Container */}
      <div className="relative h-full flex-shrink-0 pr-4">
        <div className="h-full w-2 bg-mediumGray absolute top-0 left-1/2 transform -translate-x-1/2">
          {/* Render a single bar for total completion */}
          <div
            className="w-2 bg-green transition-all duration-300"
            style={{
              height: `${totalCompletionPercentage}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Course Sections Container */}
      <div className="scrollbar-hidden overflow-y-auto max-h-full flex-grow">
        {courseData.sections.map((section, index) => (
          <div key={index} className="course-section mb-2 text-white">
            <div
              className="section-header cursor-pointer flex items-center justify-between py-2 px-4 bg-dark rounded-md hover:bg-mediumGray transition"
              onClick={() => toggleSection(index)}
            >
              <h3 className={`section-title font-bold text-lg ${section.completed ? 'text-green' : 'text-white'}`}>{section.title}</h3>
            </div>
            {expandedSection === index && (
              <div className="section-content mt-0 text-white bg-dark p-4 rounded-md">
                {section.units?.map((unit, unitIndex) => (
                  <div
                    key={unitIndex}
                    className={`unit-item flex items-center py-2 ${
                      unitIndex === section.units.length - 1 ? '' : 'border-b border-mediumGray'
                    }`}
                  >
                    <p className={`unit-title text-md flex-1 ${unit.finished ? 'text-green' : 'text-white'}`}>
                      {unit.title}
                    </p>
                    <img
                      src="./test.png"
                      alt="Test icon"
                      className={`ml-2 w-5 h-5 ${unit.finished ? 'opacity-50' : 'opacity-100'}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePlan;
