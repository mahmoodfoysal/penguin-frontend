import React, { useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import initilizationAuthentication from "../../../firebase/firebase.init";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser, setRole } from "../../../store/slice/user";

import axios from "axios";
import Swal from "sweetalert2";

initilizationAuthentication();

const provider = new GoogleAuthProvider();

const auth = getAuth();

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);
  const [formData, setFormData] = useState({
    fullName: null,
    password: null,
    photoUrl: null,
    email: null,
  });
  const [passVisible, setPassVisible] = useState(false);

  const handleChangeLoginRegister = () => {
    setIsLogin(!isLogin);

    setFormData({});
  };

  const handlePasswordVisible = () => {
    setPassVisible(!passVisible);
  };

  // google singin
  const handleGoogleSignIn = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        dispatch(setUser({ token: user.accessToken }));
        if (token) {
          const url = `http://localhost:5000/admin/get-admin-list/${user.email}`;
          const response = await axios.get(url);
          dispatch(setRole(response.data));
        }
        navigate(location.state?.from?.pathname || "/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // create account
  const handleRegistration = () => {
    setIsInvalid(false);
    if (!formData.fullName || !formData.email || !formData.password) {
      setIsInvalid(true);
      Swal.fire({
        icon: "error",
        title: "Invalid!",
        text: "Please fill all the required field.",
        confirmButtonText: "OK",
      });
      return;
    }
    const userEmail = formData.email;
    const userPassword = formData.password;
    const name = formData.fullName;
    const photo = formData.photoUrl;

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        // Update user profile
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
          phoneNumber: null,
        });
        console.log(user);
        dispatch(setUser({ token: user.accessToken }));
        setFormData({});

        console.log(user.accessToken);
        navigate(location.state?.from?.pathname || "/home");
        setIsInvalid(false);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Success.",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  // login
  const handleLogin = async () => {
    setIsInvalid(false);
    if (!formData.email || !formData.password) {
      setIsInvalid(true);
      Swal.fire({
        icon: "error",
        title: "Invalid!",
        text: "Please fill all the required field.",
        confirmButtonText: "OK",
      });
      return;
    }
    const userEmail = formData.email;
    const userPassword = formData.password;
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async (userCredential) => {
        const user = userCredential.user;
        dispatch(setUser({ token: user.accessToken }));

        if (user) {
          const url = `http://localhost:5000/admin/get-admin-list/${userEmail}`;
          const response = await axios.get(url);
          dispatch(setRole(response.data));
        }

        setFormData({});
        setIsInvalid(false);
        navigate(location.state?.from?.pathname || "/home");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Success.",
          confirmButtonText: "OK",
        });
      })

      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <>
      <div className="bg-base-100 min-h-screen font-body selection:bg-accent selection:text-white flex flex-col lg:flex-row">
        {/* LEFT SIDE: BRAND IMPACT (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-base-content relative overflow-hidden items-center justify-center p-20">
          {/* Background Decorative Text */}
          <div className="absolute inset-0 opacity-10 flex flex-col justify-center items-center select-none pointer-events-none">
            <span className="font-heading font-black text-[20vw] leading-none uppercase italic text-base-100 text-outline">
              Penguin
            </span>
            <span className="font-heading font-black text-[20vw] leading-none uppercase italic text-accent">
              Gear
            </span>
          </div>

          {/* Featured Image / Message */}
          <div className="relative z-10 text-base-100">
            <h2 className="font-heading text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
              Join with <br />{" "}
              <span className="text-accent text-outline">Penguin</span>
            </h2>
            <p className="font-heading font-bold uppercase tracking-[0.4em] text-xs opacity-60">
              Exclusive Items • Early Delivery • Authentic Products
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: AUTH FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-base-100">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-12">
              <h1 className="font-heading text-5xl font-black uppercase italic tracking-tighter mb-2">
                {isLogin ? "Welcome " : "Create "}
                <span className="text-accent">
                  {isLogin ? "Back" : "Account"}
                </span>
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                {isLogin
                  ? "Enter your email and password..."
                  : "Join with Penguin and explore a new world"}
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    type="text"
                    className={`w-full border-b-2 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-base-content/40 ${
                      isInvalid && !formData.fullName
                        ? "border-red-600"
                        : "border-base-content/20"
                    }`}
                    placeholder="Enter your name"
                  />
                </div>
              )}

              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    PhotoURL
                  </label>
                  <input
                    value={formData.photoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, photoUrl: e.target.value })
                    }
                    type="url"
                    className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-base-content/40"
                    placeholder="photo url"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                  className={`w-full border-b-2 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-base-content/40 ${
                    isInvalid && !formData.email
                      ? "border-red-600"
                      : "border-base-content/20"
                  }`}
                  placeholder="name@email.com"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Password <span className="text-red-600">*</span>
                  </label>
                  {/* {isLogin && (
                    <button className="text-[9px] font-black uppercase tracking-tighter hover:text-accent transition-colors">
                      Forgot?
                    </button>
                  )} */}
                  <span
                    onClick={handlePasswordVisible}
                    className="material-icons text-[9px] cursor-pointer hover:text-accent transition-colors"
                  >
                    {!passVisible ? "visibility" : "visibility_off"}
                  </span>
                </div>
                <input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type={`${!passVisible ? "password" : "text"}`}
                  className={`w-full border-b-2 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-base-content/40 ${
                    isInvalid && !formData.password
                      ? "border-red-600"
                      : "border-base-content/20"
                  }`}
                  placeholder={`${!passVisible ? "*********" : "12333333333"}`}
                />
              </div>

              {/* CTA Buttons */}
              <div className="pt-6 space-y-2">
                {isLogin ? (
                  <button
                    onClick={handleLogin}
                    className="w-full bg-base-content text-base-100 py-4 font-heading font-black uppercase tracking-[0.3em] text-sm hover:bg-accent transition-all shadow-xl shadow-black/10 cursor-pointer"
                  >
                    Login Now
                  </button>
                ) : (
                  <button
                    onClick={handleRegistration}
                    className="w-full bg-base-content text-base-100 py-4 font-heading font-black uppercase tracking-[0.3em] text-sm hover:bg-accent transition-all shadow-xl shadow-black/10 cursor-pointer"
                  >
                    Register Account
                  </button>
                )}

                <div>
                  <div className="w-full space-y-2 ">
                    {/* The "OR" Divider */}
                    <div className="flex items-center gap-4 my-3">
                      <div className="h-[1px] bg-base-content/10 flex-grow"></div>
                      <span className="font-heading font-black text-[10px] uppercase tracking-widest opacity-40">
                        Or
                      </span>
                      <div className="h-[1px] bg-base-content/10 flex-grow"></div>
                    </div>

                    {/* The Google Button */}
                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full flex items-center justify-center gap-3 bg-base-100 border border-[#dadce0] py-3 px-4 rounded-sm hover:bg-[#f8f9fa] hover:shadow-md transition-all cursor-pointer"
                    >
                      {/* Official Google G Logo SVG */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                          fill="#4285F4"
                        />
                        <path
                          d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                          fill="#34A853"
                        />
                        <path
                          d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706s.102-1.166.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.443 2.048.957 4.962L3.964 7.294c.708-2.127 2.692-3.714 5.036-3.714z"
                          fill="#EA4335"
                        />
                      </svg>

                      <span className="text-[#3c4043] font-sans font-medium text-sm tracking-tight">
                        Continue with Google
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Footer Toggle */}
            <div className="mt-6 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                {isLogin ? "Don't have an account?" : "Already a member?"}
              </p>
              <button
                onClick={() => handleChangeLoginRegister()}
                className="mt-2 font-heading font-black text-sm uppercase tracking-widest text-accent border-b-2 border-accent pb-1 hover:text-black hover:border-black transition-all cursor-pointer"
              >
                {isLogin ? "Create One Now" : "Login to Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
