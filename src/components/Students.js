
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Camera,
  Upload,
  GraduationCap,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const App = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePhoto: null
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const API = "http://localhost:5000";

  const HandleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const HandleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (preview) URL.revokeObjectURL(preview);

      setFormData({
        ...formData,
        profilePhoto: file
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setImageUrl("");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("profilePhoto", formData.profilePhoto);

      const response = await fetch(`${API}/create`, {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Registration Failed");
      }

      setMessage("Registration completed successfully!");

      const studentId = result.student._id;

      const imageResponse = await fetch(
        `${API}/image/${studentId}`
      );

      const imageData = await imageResponse.json();

      if (imageResponse.ok) {
        setImageUrl(imageData.imageUrl);
      }

      if (preview) URL.revokeObjectURL(preview);

      setFormData({
        name: "",
        email: "",
        password: "",
        profilePhoto: null
      });

      setPreview("");

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5ff] flex items-center justify-center p-4 md:p-8">

      <div className="max-w-6xl w-full bg-white rounded-[30px] overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="relative bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-800 p-8 md:p-12 text-white flex flex-col justify-between min-h-[550px]">

          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -right-20"></div>

          <div className="absolute w-56 h-56 bg-purple-300/10 rounded-full bottom-10 -left-20"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <GraduationCap size={30} />
              </div>

              <h2 className="text-2xl font-bold">
                StudentHub
              </h2>
            </div>

            <div className="mt-20">

              <p className="uppercase tracking-[4px] text-blue-200 text-sm font-semibold">
                Welcome to StudentHub
              </p>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-5">
                Start Your
                <br />
                Journey With
                <span className="text-yellow-300"> Us.</span>
              </h1>

              <p className="text-blue-100 mt-6 leading-7 max-w-sm">
                Create your student account and become part of our learning community.
              </p>

              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-300" />
                  <span>Simple Registration Process</span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-300" />
                  <span>Secure Profile Management</span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-300" />
                  <span>Cloud Image Storage</span>
                </div>

              </div>

            </div>
          </div>

          <p className="relative z-10 text-blue-200 text-sm mt-10">
            © 2026 StudentHub. All rights reserved.
          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-7 md:p-12">

          <div className="mb-8">

            <p className="text-indigo-600 font-semibold text-sm">
              CREATE ACCOUNT
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Student Registration
            </h2>

            <p className="text-gray-500 mt-2">
              Fill in your details to get started.
            </p>

          </div>

          <form onSubmit={HandleSubmit} className="space-y-5">

            {/* PROFILE PHOTO */}

            <div className="flex flex-col items-center mb-7">

              <div className="relative">

                <div className="w-28 h-28 rounded-full bg-indigo-50 border-4 border-indigo-100 flex items-center justify-center overflow-hidden">

                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={45} className="text-indigo-400" />
                  )}

                </div>

                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2.5 rounded-full cursor-pointer hover:bg-indigo-700 shadow-lg">

                  <Camera size={17} />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={HandleImage}
                    required
                    className="hidden"
                  />

                </label>

              </div>

              <p className="text-sm text-gray-500 mt-3">
                Upload your profile photo
              </p>

            </div>

            {/* NAME */}

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <div className="relative mt-2">

                <User className="absolute left-4 top-3.5 text-gray-400" size={19} />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={HandleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                />

              </div>
            </div>

            {/* EMAIL */}

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative mt-2">

                <Mail className="absolute left-4 top-3.5 text-gray-400" size={19} />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={HandleChange}
                  placeholder="example@gmail.com"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                />

              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative mt-2">

                <Lock className="absolute left-4 top-3.5 text-gray-400" size={19} />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={HandleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                />

              </div>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-indigo-200 transition duration-300 disabled:opacity-60"
            >

              {loading ? "Creating Account..." : "Create Account"}

              {!loading && <ArrowRight size={19} />}

            </button>

          </form>

          {/* MESSAGE */}

          {message && (
            <div className="mt-5 p-3 rounded-xl bg-green-50 text-green-700 text-center text-sm font-medium">
              {message}
            </div>
          )}

          {/* UPLOADED IMAGE */}

          {imageUrl && (
            <div className="mt-6 text-center border border-green-200 bg-green-50 p-5 rounded-2xl">

              <CheckCircle className="mx-auto text-green-600 mb-2" size={25} />

              <p className="font-semibold text-green-700">
                Profile Uploaded Successfully!
              </p>

              <img
                src={imageUrl}
                alt="Student Profile"
                className="w-24 h-24 rounded-full object-cover mx-auto mt-4 border-4 border-white shadow"
              />

              <a
                href={imageUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 underline text-sm inline-block mt-3"
              >
                View Profile Image
              </a>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default App;
