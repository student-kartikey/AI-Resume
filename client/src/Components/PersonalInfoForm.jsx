import {
  BriefcaseBusiness,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React from "react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    // { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get Started with the Personal Information
      </p>
      {/* Image Upload Section */}
      <div className="flex items-center gap-6">
        <label className="relative group cursor-pointer">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user-image"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-indigo-500 hover:opacity-90 transition-all"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 group-hover:border-indigo-400 group-hover:text-indigo-500 transition-all">
              <User className="size-8" />
              <span className="text-[10px] font-medium">UPLOAD</span>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {typeof data.image === "object" && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Background Removal
            </p>
            <label className="relative inline-flex items-center cursor-pointer gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              <div className="w-10 h-5 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></span>
              <span className="text-sm text-gray-700 font-medium">
                {removeBackground ? "Enabled" : "Disabled"}
              </span>
            </label>
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Icon className="size-5" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
              className="mt-1 w-full bg-slate-100 border border-gray-300 
                focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none py-2 px-3 transtion-color text-sm"
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
