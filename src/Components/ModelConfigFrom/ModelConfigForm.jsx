/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChevronDown, ChevronUp, User, Camera, Palette, Image as ImageIcon, Sparkles, Info, Rocket } from "lucide-react";
import {
  backgroundOptions,
  countryOptions,
  eyeColorOptions,
  genderOptions,
  hairColorOptions,
  hairTypeOptions,
  poseOptions,
  skinColorOptions,
} from "./optionInput";

const CollapsibleSection = ({ title, icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className='border-b border-gray-700'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between p-3 hover:bg-gray-700/50 transition-colors'>
        <div className='flex items-center gap-2'>
          {icon}
          <span className='font-medium'>{title}</span>
        </div>
        {isOpen ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
      </button>
      {isOpen && <div className='p-3 space-y-3'>{children}</div>}
    </div>
  );
};

const Tooltip = ({ text, children }) => {
  return (
    <div className='group relative inline-block'>
      {children}
      <div className='absolute left-full ml-2 px-2 py-1 bg-gray-800 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap'>
        {text}
      </div>
    </div>
  );
};

const SegmentedControl = ({ options, value, onChange }) => {
  return (
    <div className='flex rounded-lg bg-gray-900 p-1'>
      {options.map((option) => (
        <button
          key={option.value}
          className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-colors ${value === option.value ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-transparent "
            }`}
          onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
};

const ModelConfigForm = ({
  setGender,
  setAge,
  age,
  setHairColor,
  setHairType,
  setPose,
  setSkinColor,
  setEyeColor,
  setCountry,
  setBackground,
  setDnaNumber,
  background,
  setModel,
  setSeedType,
  setSeed,
  seed,
  setDress,
  setShotType,
  shotType,
  country,
  gender,
  hairType,
  skinColor,
  seedType,
  model,
  hairColor,
  eyeColor,
  pose,
  loading,
  generateImage,
  dress,
  dnaNumber
}) => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className='w-full h-screen bg-gray-800 text-white flex flex-col'>
      {/* Header */}
      <div className='p-4 bg-gray-900'>
        <h2 className='text-xl font-bold flex items-center gap-2'>
          <Sparkles className='w-5 h-5' />
          Model Generator
        </h2>
      </div>

      {/* Tabs */}
      <div className='flex border-b border-gray-700'>
        <button
          className={`flex-1 p-2 ${activeTab === "basic" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700/50"}`}
          onClick={() => setActiveTab("basic")}>
          Basic
        </button>
        <button
          className={`flex-1 p-2 ${activeTab === "advanced" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700/50"}`}
          onClick={() => setActiveTab("advanced")}>
          Advanced
        </button>
      </div>

      {/* Scrollable Content */}
      <div className='flex-1 overflow-y-auto overflow-x-hidden'>
        {activeTab === "basic" && (
          <>
            <CollapsibleSection title='Basic Info' icon={<User className='w-4 h-4' />}>
              <div className='space-y-3'>
                <div>
                  <label className='block text-sm mb-1'>Country</label>
                  <select className='w-full bg-gray-900 rounded p-2 text-sm' value={country} onChange={(e) => setCountry(e.target.value)}>
                    {countryOptions.map((o, i) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='block text-sm mb-1'>Gender</label>
                    <select className='w-full bg-gray-900 rounded p-2 text-sm' value={gender} onChange={(e) => setGender(e.target.value)}>
                      {genderOptions.map((o, i) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm mb-1'>Age</label>
                    <input
                      type='number'
                      className='w-full bg-gray-900 rounded p-2 text-sm'
                      onChange={(e) => setAge(e.target.value)}
                      value={age}
                      min='18'
                      max='65'
                      defaultValue='25'
                    />
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title='Appearance' icon={<Palette className='w-4 h-4' />}>
              <div className='space-y-3'>
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='block text-sm mb-1'>Hair Color</label>
                    <select
                      value={hairColor}
                      className='w-full bg-gray-900 rounded p-2 text-sm'
                      onChange={(e) => setHairColor(e.target.value)}>
                      {hairColorOptions.map((o, i) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm mb-1'>Hair Style</label>
                    <select
                      value={hairType}
                      className='w-full bg-gray-900 rounded p-2 text-sm'
                      onChange={(e) => setHairType(e.target.value)}>
                      {hairTypeOptions.map((o, i) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm mb-1'>Eye Color</label>
                    <select
                      value={eyeColor}
                      className='w-full bg-gray-900 rounded p-2 text-sm'
                      onChange={(e) => setEyeColor(e.target.value)}>
                      {eyeColorOptions.map((o, i) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm mb-1'>Skin Color</label>
                    <select
                      value={skinColor}
                      className='w-full bg-gray-900 rounded p-2 text-sm'
                      onChange={(e) => setSkinColor(e.target.value)}>
                      {skinColorOptions.map((o, i) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title='Shot Settings' icon={<Camera className='w-4 h-4' />}>
              <div className='space-y-3'>
                <div>
                  <label className='block text-sm mb-1'>Shot Type</label>
                  <SegmentedControl
                    options={[
                      { value: "Full Body", label: "Full Body" },
                      { value: "Half Body", label: "Half Body" },
                    ]}
                    value={shotType}
                    onChange={(value) => setShotType(value)}
                  />
                </div>
                <div>
                  <label className='block text-sm mb-1'>Dress Description</label>
                  <textarea rows={1} value={dress} onChange={(e) => {
                    setDress(e.target.value); // Update dress state
                    console.log("Dress Input:", e.target.value); // Debugging
                  }} className='w-full bg-gray-900 rounded p-2 text-sm' />
                </div>
                <div>
                  <label className='block text-sm mb-1'>Pose</label>
                  <select value={pose} className='w-full bg-gray-900 rounded p-2 text-sm' onChange={(e) => setPose(e.target.value)}>
                    {poseOptions.map((o, i) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CollapsibleSection>
            <CollapsibleSection title='Generation Settings' icon={<Sparkles className='w-4 h-4' />}>
              <div className='space-y-3'>
                <div>
                  <label className='block text-sm mb-1'>Seed Type</label>
                  <SegmentedControl
                    options={[
                      { value: "Auto Generate", label: "Auto" },
                      { value: "Custom Generated", label: "Custom" },
                    ]}
                    value={seedType}
                    onChange={(value) => setSeedType(value)}
                  />
                </div>

                {seedType === "Custom Generated" && (
                  <div>
                    <label className='block text-sm mb-1'>Model DNA Number</label>
                    <input
                      type='number'
                      className='w-full bg-gray-900 rounded p-2 text-sm'
                      value={dnaNumber}
                      onChange={(e) => setDnaNumber(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <label className='block text-sm mb-1'>
                    Number of Models
                    <Tooltip text='Generate up to 4 models at once'>
                      <Info className='w-4 h-4 inline ml-1' />
                    </Tooltip>
                  </label>
                  <div className='flex  gap-2'>
                    <input
                      type='range'
                      min='1'
                      max='4'
                      value={model}
                      onChange={(e) => setModel(parseInt(e.target.value))}
                      className='w-full'
                    />
                    <div className='text-right text-sm'>{model}</div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          </>
        )}

        {activeTab === "advanced" && (
          <>
            <CollapsibleSection title='Background' icon={<ImageIcon className='w-4 h-4' />}>
              <div className='space-y-3'>
                <div>
                  <label className='block text-sm mb-1'>Background</label>
                  <select
                    className='w-full bg-gray-900 rounded p-2 text-sm'
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}>
                    {backgroundOptions.map((o, i) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div>
                  <label className='block text-sm mb-1'>Lighting</label>
                  <select className='w-full bg-gray-900 rounded p-2 text-sm'>
                    <option>Natural</option>
                    <option>Studio</option>
                    <option>Dramatic</option>
                  </select>
                </div> */}
              </div>
            </CollapsibleSection>
          </>
        )}
      </div>

      {/* Footer Actions */}
      <div className='p-4 border-t border-gray-700 bg-gray-900'>
        <div className='flex gap-2'>
          <button
            onClick={generateImage}
            className='flex-1 flex justify-center gap-2 items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform'>
            {loading ? <LoadingSpinner size={15} /> : <Rocket className=' h-4 w-4' />}
            <span>{loading ? "Generating..." : "Generate Image"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ size = 24, className, ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      {...props}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`animate-spin ${className}`}>
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  );
};

export default ModelConfigForm;
