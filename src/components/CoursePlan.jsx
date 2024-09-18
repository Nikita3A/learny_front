import React, { useState } from 'react';
import UnitInfo from './UnitInfo'; // Import the UnitInfo component
import Test from './Test';

const CoursePlan = ({ courseData, selectedUnit, setSelectedUnit }) => {
  // Fallback courseData in case it's not passed as a prop
  courseData = courseData || {
    sections: [
      {
        title: "Introduction",
        units: [
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Introduction",
        units: [
          { title: "Overview", finished: true, content: "Overview content", pageCount: 10, testId: 1 },
          { title: "Basics", finished: true, content: "Basics content", pageCount: 8, testId: 1 },
        ],
        completed: true,
      },
      {
        title: "Advanced Topics",
        units: [
          { title: "Deep Dive", finished: false, content: "Deep Dive content", pageCount: 15, testId: 1 },
          { title: "Hands-on Examples", finished: false, content: "Hands-on content", pageCount: 20, testId: 1 },
        ],
        completed: false,
      },
    ],
  };
  const [expandedSection, setExpandedSection] = useState(null);
  const [isTakingTest, setIsTakingTest] = useState(false);
  const [testData, setTestData] = useState([]); 
  // const [selectedUnit, setSelectedUnit] = useState(null); // New state for selected unit

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
    setSelectedUnit(null); // Clear selected unit when toggling sections
  };

  const handleUnitClick = (unit) => {
    console.log('CP unit: ', unit);
    setSelectedUnit(unit); // Set the clicked unit as the selected unit
    // console.log('CP unit2: ', unit);
  };

  const handleTestClick = (testId) => {
    // setSelectedUnit(null);
    console.log('Test: ', testId);
    // Example test questions based on testId
    const exampleTestData = [
      {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris",
        type: "single-choice" // Type for QuestionType1
      },
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
        type: "single-choice" // Type for QuestionType1
      },
      {
        question: "Select all that apply: Which are prime numbers?",
        options: ["2", "3", "4", "5"],
        correctAnswers: ["2", "3", "5"], // Multiple correct answers
        type: "multiple-choice" // Type for QuestionType2
      },
      {
        question: "What is the chemical symbol for water?",
        correctAnswer: "H2O", // Text input correct answer
        type: "text-input" // Type for QuestionType3
      }
    ];

    setTestData(exampleTestData); // Set the test data
    setIsTakingTest(true); // Switch to test mode
  };

  const handleTestFinish = () => {
    setIsTakingTest(false); // Exit test mode after finishing
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
    <div className="p-0 sm:p-5 bg-darkGray h-full w-full rounded-2xl flex flex-col">
      {/* Check if taking test */}
      {isTakingTest ? (
        <Test testData={testData} handleTestFinish={handleTestFinish} />
      ) : (
        <>
          <div className="sm:hidden relative w-full flex-shrink-0 mb-2">
            <div className="rounded-2xl h-2 w-full bg-mediumGray">
              <div
                className="rounded-2xl h-2 bg-green transition-all duration-300"
                style={{ width: `${totalCompletionPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="scrollbar-hidden overflow-y-auto flex-grow h-full">
            {selectedUnit ? (
              <UnitInfo
                unitName={selectedUnit.title}
                content={selectedUnit.content}
                pageCount={selectedUnit.pageCount}
              />
            ) : (
              courseData.sections.map((section, index) => (
                <div key={index} className="course-section mb-2 text-white">
                  <div
                    className="section-header cursor-pointer flex items-center justify-between py-2 px-4 bg-dark rounded-md hover:bg-mediumGray transition"
                    onClick={() => toggleSection(index)}
                  >
                    <h3 className={`section-title font-bold text-lg ${section.completed ? 'text-green' : 'text-white'}`}>
                      {section.title}
                    </h3>
                  </div>
                  {expandedSection === index && (
                    <div className="section-content mt-0 text-white bg-dark p-4 rounded-md">
                      {section.units?.map((unit, unitIndex) => (
                        <div
                          key={unitIndex}
                          className={`unit-item flex items-center py-2 ${
                            unitIndex === section.units.length - 1 ? '' : 'border-b border-mediumGray'
                          }`}
                          onClick={() => handleUnitClick(unit)}
                        >
                          <p className={`unit-title text-md flex-1 cursor-pointer ${unit.finished ? 'text-green' : 'text-white'}`}>
                            {unit.title}
                          </p>
                          <div onClick={() => handleTestClick(unit.testId)}>
                            <img
                              src="./test.png"
                              alt="Test icon"
                              className={`ml-2 w-5 h-5 ${unit.finished ? 'opacity-50' : 'opacity-100'}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
  // return (
  //   <div className="p-0 sm:p-5 bg-darkGray h-full w-full rounded-2xl flex flex-col">
  //     {/* Progress Bar Container */}
  //     <div className="sm:hidden relative w-full flex-shrink-0 mb-2">
  //       <div className="rounded-2xl h-2 w-full bg-mediumGray">
  //         <div
  //           className="rounded-2xl h-2 bg-green transition-all duration-300"
  //           style={{ width: `${totalCompletionPercentage}%` }}
  //         ></div>
  //       </div>
  //     </div>

  //     {/* Course Sections or Unit Info */}
  //     {/* <div className="scrollbar-hidden overflow-y-auto flex-grow max-h-[calc(100vh-50px)]"> */}
  //     <div className="scrollbar-hidden overflow-y-auto flex-grow h-full">
  //       {selectedUnit ? (
  //         <UnitInfo
  //           unitName={selectedUnit.title}
  //           content={selectedUnit.content}
  //           pageCount={selectedUnit.pageCount}
  //         />
  //       ) : (
  //         courseData.sections.map((section, index) => (
  //           <div key={index} className="course-section mb-2 text-white">
  //             <div
  //               className="section-header cursor-pointer flex items-center justify-between py-2 px-4 bg-dark rounded-md hover:bg-mediumGray transition"
  //               onClick={() => toggleSection(index)}
  //             >
  //               <h3 className={`section-title font-bold text-lg ${section.completed ? 'text-green' : 'text-white'}`}>
  //                 {section.title}
  //               </h3>
  //             </div>
  //             {expandedSection === index && (
  //               <div className="section-content mt-0 text-white bg-dark p-4 rounded-md">
  //                 {section.units?.map((unit, unitIndex) => (
  //                   <div
  //                     key={unitIndex}
  //                     className={`unit-item flex items-center py-2 ${
  //                       unitIndex === section.units.length - 1 ? '' : 'border-b border-mediumGray'
  //                     }`}
  //                     // onClick={() => handleUnitClick(unit)} // Handle unit click
  //                   >
  //                     <p className={`unit-title text-md flex-1 cursor-pointer ${unit.finished ? 'text-green' : 'text-white'}`}
  //                       onClick={() => handleUnitClick(unit)}
  //                     >
  //                       {unit.title}
  //                     </p>
  //                     <div onClick={() => handleTestClick(unit.testId)}>
  //                       <img
  //                         src="./test.png"
  //                         alt="Test icon"
  //                         className={`ml-2 w-5 h-5 ${unit.finished ? 'opacity-50' : 'opacity-100'}`}
  //                       />
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         ))
  //       )}
  //     </div>
  //   </div>
  // );
};

export default CoursePlan;
