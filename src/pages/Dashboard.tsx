import React, { useState } from "react";
import { format } from "date-fns";
import KPI from "../components/dashboard/KPI";
import Calendar from "../components/dashboard/Calendar";
import CourseStatus from "../components/dashboard/CourseStatus";
import CourseProgress from "../components/dashboard/CourseProgress";
import UserProgression from "../components/dashboard/UserProgression";
import EnrolledCourses from "../components/dashboard/EnrolledCourses";
import AiAssistant from "../components/dashboard/AiAssistant";

const Dashboard: React.FC<{ userName: string }> = ({ userName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const currentDate = format(new Date(), "EEEE, MMMM dd, yyyy");
  const currentTime = format(new Date(), "hh:mm:ss a");

  const currentHour = new Date().getHours();
  let greeting = "Good Day";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {greeting}, {userName}!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {currentDate} | {currentTime}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <KPI />

      {/* Dashboard Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-6 mb-10">
        <Calendar />
        <CourseStatus />
      </div>

      {/* Course Progress Overview */}
      <CourseProgress />

      {/* Enrolled Courses List */}
      <EnrolledCourses />

      {/* User Progression Card */}
      <UserProgression searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* AI Assistant Button */}
      <AiAssistant  />
    </div>
  );
};

export default Dashboard;
