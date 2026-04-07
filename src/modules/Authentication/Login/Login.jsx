import React, { useRef, useState } from "react";
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

initilizationAuthentication();

const provider = new GoogleAuthProvider();

const auth = getAuth();

const Login = () => {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const fullName = useRef();
  const photoUrl = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);

  const handleChangeLoginRegister = () => {
    setIsLogin(!isLogin);
    email.current.value = null;
    password.current.value = null;
    photoUrl.current.value = null;
    fullName.current.value = null;
  };

  // google singin
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        dispatch(setUser(user.accessToken));
        if (token) {
          const url = `http://localhost:5000/admin/get-admin-list/${user.email}`;
          const adminCheck = axios.get(url);
          dispatch(setRole(adminCheck?.data));
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
    const userEmail = email.current.value;
    const userPassword = password.current.value;
    const name = fullName.current.value;
    const photo = photoUrl.current.value;
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        // Update user profile
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
          phoneNumber: 90000,
        });
        console.log(user);
        dispatch(setUser(user.accessToken));
        email.current.value = null;
        password.current.value = null;
        photoUrl.current.value = null;
        fullName.current.value = null;

        console.log(user.accessToken);
        navigate(location.state?.from?.pathname || "/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  // login
  const handleLogin = () => {
    const userEmail = email.current.value;
    const userPassword = password.current.value;
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        sessionStorage.setItem(
          "penguin-shopping",
          JSON.stringify(user.accessToken),
        );
        dispatch(setUser(user.accessToken));
        if (user) {
          const url = `http://localhost:5000/admin/get-admin-list/${email.current.value}`;
          const adminCheck = axios.get(url);
          dispatch(setRole(adminCheck?.data));
        }

        email.current.value = null;
        password.current.value = null;

        navigate(location.state?.from?.pathname || "/home");
      })

      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div>
      <div className="bg-white min-h-screen font-body selection:bg-accent selection:text-white flex flex-col lg:flex-row">
        {/* LEFT SIDE: BRAND IMPACT (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden items-center justify-center p-20">
          {/* Background Decorative Text */}
          <div className="absolute inset-0 opacity-10 flex flex-col justify-center items-center select-none pointer-events-none">
            <span className="font-heading font-black text-[20vw] leading-none uppercase italic text-white text-outline">
              Penguin
            </span>
            <span className="font-heading font-black text-[20vw] leading-none uppercase italic text-accent">
              LABS
            </span>
          </div>

          {/* Featured Image / Message */}
          <div className="relative z-10 text-white">
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
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
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
                    Full Name
                  </label>
                  <input
                    ref={fullName}
                    type="text"
                    className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/20"
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
                    ref={photoUrl}
                    type="url"
                    className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/20"
                    placeholder="photo url"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  Email Address
                </label>
                <input
                  ref={email}
                  type="email"
                  className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/20"
                  placeholder="name@email.com"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Password
                  </label>
                  {/* {isLogin && (
                    <button className="text-[9px] font-black uppercase tracking-tighter hover:text-accent transition-colors">
                      Forgot?
                    </button>
                  )} */}
                </div>
                <input
                  ref={password}
                  type="password"
                  className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/20"
                  placeholder="••••••••"
                />
              </div>

              {/* CTA Buttons */}
              <div className="pt-6 space-y-2">
                {isLogin ? (
                  <button
                    onClick={handleLogin}
                    className="w-full bg-black text-white py-4 font-heading font-black uppercase tracking-[0.3em] text-sm hover:bg-accent transition-all shadow-xl shadow-black/10 cursor-pointer"
                  >
                    Login Now
                  </button>
                ) : (
                  <button
                    onClick={handleRegistration}
                    className="w-full bg-black text-white py-4 font-heading font-black uppercase tracking-[0.3em] text-sm hover:bg-accent transition-all shadow-xl shadow-black/10 cursor-pointer"
                  >
                    Register Account
                  </button>
                )}

                <div>
                  <div className="w-full space-y-2 ">
                    {/* The "OR" Divider */}
                    <div className="flex items-center gap-4 my-3">
                      <div className="h-[1px] bg-black/10 flex-grow"></div>
                      <span className="font-heading font-black text-[10px] uppercase tracking-widest opacity-40">
                        Or
                      </span>
                      <div className="h-[1px] bg-black/10 flex-grow"></div>
                    </div>

                    {/* The Google Button */}
                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full flex items-center justify-center gap-3 bg-white border border-[#dadce0] py-3 px-4 rounded-sm hover:bg-[#f8f9fa] hover:shadow-md transition-all cursor-pointer"
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
                className="mt-2 font-heading font-black text-sm uppercase tracking-widest text-accent border-b-2 border-accent pb-1 hover:text-black hover:border-black transition-all"
              >
                {isLogin ? "Create One Now" : "Login to Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
