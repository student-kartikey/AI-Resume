import React, { useState, useEffect } from "react";
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#028467", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [showEditResume, setShowEditResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [editResumeId, setEditResumeId] = useState(""); // Added missing state

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (e) => {
    e.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/res123`);
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setShowUploadResume(false);
    navigate(`/app/builder/res123`);
  };

  const editTitle = async (e) => {
    e.preventDefault();
    setShowEditResume(false);
    setTitle("");
    navigate(`/app/builder/${editResumeId}`);
  };

  const deleteResume = async (resumeId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this resume?",
    );
    if (isConfirmed) {
      // Fixed: logic was reversed
      setAllResumes((prev) => prev.filter((res) => res._id !== resumeId));
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent">
          Welcome, Joe Doe
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-8 w-full sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <div // Changed from button to div to avoid nested button issues
                key={index}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: `${baseColor}40`,
                }}
              >
                <div
                  className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                >
                  <FilePenLineIcon
                    className="size-7"
                    style={{ color: baseColor }}
                  />
                  <p
                    className="text-sm font-medium px-2 text-center"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </p>
                </div>

                <p className="absolute bottom-2 text-[10px] text-slate-400 px-2 text-center">
                  Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-2 right-2 flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-6 p-1 hover:bg-white/50 rounded text-red-500 cursor-pointer"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setShowEditResume(true);
                      setTitle(resume.title);
                    }}
                    className="size-6 p-1 hover:bg-white/50 rounded text-slate-700 cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {showCreateResume && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowCreateResume(false)}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={createResume}
              className="relative bg-white border shadow-xl rounded-lg w-full max-w-sm p-8"
            >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded outline-none focus:border-green-600"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => setShowCreateResume(false)}
              />
            </form>
          </div>
        )}

        {showEditResume && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditResume(false)}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={editTitle}
              className="bg-white rounded-xl p-8 w-full max-w-sm relative"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full p-2 border rounded mb-4 outline-none focus:border-green-500"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded font-bold">
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 cursor-pointer text-slate-400"
                onClick={() => {
                  setShowEditResume(false);
                  setTitle("");
                }}
              />
            </form>
          </div>
        )}

        {showUploadResume && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowUploadResume(false)}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={uploadResume}
              className="relative bg-white border shadow-xl rounded-lg w-full max-w-sm p-8"
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded outline-none focus:border-green-600"
                required
              />
              <input
                type="file"
                id="resume-input"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setResumeFile(e.target.files[0])}
              />
              <label htmlFor="resume-input">
                <div className="flex flex-col items-center justify-center gap-2 border border-slate-300 border-dashed rounded-md p-6 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                  {resumeFile ? (
                    <p className="text-green-700 text-sm truncate">
                      {resumeFile.name}
                    </p>
                  ) : (
                    <>
                      <UploadCloudIcon className="size-10 text-slate-400" />
                      <p className="text-sm text-slate-500">
                        Click to upload file
                      </p>
                    </>
                  )}
                </div>
              </label>
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Upload Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => setShowUploadResume(false)}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
