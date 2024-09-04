import React, { useState } from 'react';

const CreateCourse = () => {
  // State variables for each input field
  const [language, setLanguage] = useState('');
  const [theme, setTheme] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [learningObjectives, setLearningObjectives] = useState('');
  const [courseStructure, setCourseStructure] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Construct the course data object
    const courseData = {
      language,
      theme,
      targetAudience,
      learningObjectives,
      courseStructure,
    };

    // Process the course data (e.g., send to API or state management)
    console.log('Course Data:', courseData);

    // Clear form inputs after submission
    setLanguage('');
    setTheme('');
    setTargetAudience('');
    setLearningObjectives('');
    setCourseStructure('');
  };

  return (
    <div className="overflow-x-hidden sm:overflow-visible p-6 bg-darkGray h-full w-full rounded-xl shadow-md space-y-4">
      {/* <h2 className="text-white text-xl font-bold mb-4">Create a New Course</h2> */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Language Input */}
        <div>
          <label htmlFor="language" className="block text-white mb-1">Language of the Course</label>
          <input
            type="text"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-mediumGray text-white focus:outline-none"
            placeholder="e.g., English"
            required
          />
        </div>

        {/* Theme or Subject Input */}
        <div>
          <label htmlFor="theme" className="block text-white mb-1">Theme or Subject</label>
          <input
            type="text"
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-mediumGray text-white focus:outline-none"
            placeholder="e.g., Introduction to Python Programming"
            required
          />
        </div>

        {/* Target Audience Input */}
        <div>
          <label htmlFor="targetAudience" className="block text-white mb-1">Target Audience</label>
          <input
            type="text"
            id="targetAudience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-mediumGray text-white focus:outline-none"
            placeholder="e.g., Beginners, High School Students"
            required
          />
        </div>

        {/* Learning Objectives Input */}
        <div>
          <label htmlFor="learningObjectives" className="block text-white mb-1">Learning Objectives</label>
          <textarea
            id="learningObjectives"
            value={learningObjectives}
            onChange={(e) => setLearningObjectives(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-mediumGray text-white focus:outline-none"
            placeholder="e.g., By the end of this course, students should be able to..."
            rows="4"
            required
          ></textarea>
        </div>

        {/* Course Structure Input */}
        <div>
          <label htmlFor="courseStructure" className="block text-white mb-1">Course Structure</label>
          <textarea
            id="courseStructure"
            value={courseStructure}
            onChange={(e) => setCourseStructure(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-mediumGray text-white focus:outline-none"
            placeholder="e.g., 6 units with 4-5 chapters each..."
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green rounded-md text-white font-bold hover:bg-opacity-80 transition"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
