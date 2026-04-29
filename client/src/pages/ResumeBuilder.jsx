import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
  ChevronLeft,
  ChevronRight,
  Divide,
} from "lucide-react";
import PersonalInfoForm from "../Components/PersonalInfoForm";
import ResumePreview from "../Components/ResumePreview";
import Templateselector from "../Components/home/TemplateSelector";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professionalSummary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    acent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async (resumeId) => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    if (resumeId) {
      loadExistingResume(resumeId);
    }
  }, []);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal_info", title: "Personal Info", icon: User },
    { id: "summary", name: "summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all font-medium"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50 shadow-sm">
            Save Draft
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 shadow-sm">
            Download PDF
          </button>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-[1600px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
        {/* LEFT PANEL: The Form (4 or 5 columns wide) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-6">
            {/* Progress Bar Header */}
            <div className="relative h-1.5 w-full bg-slate-100 rounded-t-xl overflow-hidden">
              <div
                className="absolute h-full bg-indigo-600 transition-all duration-500"
                style={{
                  width: `${((activeSectionIndex + 1) / sections.length) * 100}%`,
                }}
              />
            </div>

            <div className="p-6">
              {/* Section Navigation Buttons */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  {React.createElement(activeSection.icon, {
                    className: "size-5 text-indigo-600",
                  })}
                  {activeSection.title || activeSection.name}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                    }
                    disabled={activeSectionIndex === 0}
                    className="p-2 rounded-md hover:bg-slate-100 disabled:opacity-30 border transition-all"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1),
                      )
                    }
                    disabled={activeSectionIndex === sections.length - 1}
                    className="p-2 rounded-md bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-30 transition-all"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>

              {/* Render the Form Component */}
              <div className="min-h-[400px]">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                    <Templateselector selectedTemplate={resumeData.template} onChange={(template
                    )=> setResumeData(prev => ({...prev, template}))}/>
                  </div>
                {activeSection.id === "personal_info" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(updatedInfo) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: updatedInfo,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {/* Add other sections here as you build them (ExperienceForm, etc.) */}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: The Live Preview (7 columns wide) */}
        <div className="lg:col-span-7 bg-slate-200/50 rounded-xl p-8 flex justify-center items-start overflow-y-auto max-h-[calc(100-100px)]">
          <div className="sticky top-6 w-full max-w-[800px] shadow-2xl transition-all duration-300 transform hover:scale-[1.01]">
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.acent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
