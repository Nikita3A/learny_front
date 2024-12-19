import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import LessonContent from './LessonContent';
import Test from './Test';

const CoursePlan = ({ course, selectedLesson, setSelectedLesson }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [courseData, setCourseData] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isTakingTest, setIsTakingTest] = useState(false);
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`/api/courses/${course.id}`, {
          headers: { Authorization: `Bearer ${currentUser.accessToken}` }
        });

        if (response.data && response.data.units && Array.isArray(response.data.units)) {
          setCourseData(response.data.units);
        } else {
          console.error("Invalid data format from API:", response.data);
          setCourseData([]);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setCourseData([]);
      }
    };
    if (course?.id && currentUser?.accessToken) {
      fetchCourseData();
    } else {
      console.log("Course or user data not available yet.");
    }
  }, [course, currentUser?.accessToken]);

  const toggleSection = (index) => {    
    setExpandedSection(expandedSection === index ? null : index);
    setSelectedLesson(null);
  };

  const handleLessonClick = (lesson) => {    
    setSelectedLesson(lesson);
  };

  const handleTestClick = (testId) => {
    const exampleTestData = [
      { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correctAnswer: "Paris", type: "single-choice" },
      { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4", type: "single-choice" },
      { question: "Select all that apply: Which are prime numbers?", options: ["2", "3", "4", "5"], correctAnswers: ["2", "3", "5"], type: "multiple-choice" },
      { question: "What is the chemical symbol for water?", correctAnswer: "H2O", type: "text-input" }
    ];
    setTestData(exampleTestData);
    setIsTakingTest(true);
  };

  const handleTestFinish = () => {
    setIsTakingTest(false);
  };

  console.log("Course Data Before Render:", courseData);

  return (
    <div className="p-0 sm:p-5 bg-darkGray h-full w-full rounded-2xl flex flex-col">
      {isTakingTest ? (
        <Test testData={testData} handleTestFinish={handleTestFinish} />
      ) : (
        <>
          <div className="scrollbar-hidden overflow-y-auto flex-grow h-full">
            {selectedLesson ? (
              <LessonContent unitId={courseData.find(unit => unit.lessons.some(lesson => lesson.id === selectedLesson.id))?.id} 
              lessonData={selectedLesson}/>
            ) : (
              courseData.length > 0 ? (
                courseData.map((section, index) => (
                  <div key={index} className="course-section mb-2 text-white">
                    <div
                      className="section-header cursor-pointer flex items-center justify-between py-2 px-4 bg-dark rounded-md hover:bg-mediumGray transition"
                      onClick={() => toggleSection(index)}
                    >
                      <h3 className={`section-title font-bold text-lg ${section.completed ? 'text-green' : 'text-white'}`}>
                        {section.title}
                      </h3>
                    </div>
                    {expandedSection === index && section.lessons && section.lessons.length > 0 && (
                      <div className="section-content mt-0 text-white bg-dark p-4 rounded-md">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className={`unit-item flex items-center py-2 ${lessonIndex === section.lessons.length - 1 ? '' : 'border-b border-mediumGray'}`}
                            onClick={() => handleLessonClick(lesson)}
                          >
                            <p className={`unit-title text-md flex-1 cursor-pointer ${lesson.finished ? 'text-green' : 'text-white'}`}>
                              {lesson.title}
                            </p>
                            {lesson.testId && (
                              <div onClick={() => handleTestClick(lesson.testId)}>
                                <img src="./test.png" alt="Test icon" className={`ml-2 w-5 h-5 ${lesson.finished ? 'opacity-50' : 'opacity-100'}`} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {expandedSection === index && (!section.lessons || section.lessons.length === 0) && (
                      <div className="section-content mt-0 text-white bg-dark p-4 rounded-md">
                        <p>No lessons in this section.</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-white text-center mt-4">
                  {courseData.length === 0 && currentUser?.accessToken && course?.id ? "Loading course data..." : "No courses available."}
                </p>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CoursePlan;