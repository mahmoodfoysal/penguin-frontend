import React, { useState, useRef } from "react";
import PageHeader from "../../../components/PageHeader";
import axios from "axios";
import {
  showSuccess,
  showError,
  showConfirmation,
} from "../../../components/Alert";

const Contact = () => {
  const formRef = useRef(null);

  const pageInfo = [
    { parent_route_name: "Home", path: "/home" },
    { curren_route: "Contact" },
    { first_name: "Contact", last_name: "US" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleSendEmail = async (e) => {
    if (e) e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !formData.email.includes("@"),
      message: !formData.message.trim(),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.message) {
      showError(
        "Oops...",
        "Please fill in the required fields (Name, Email, and Message).",
      );
      return;
    }

    const confirmation = await showConfirmation(
      "Are you sure?",
      "Do you want to send this message?",
      "Yes, send it!",
      "Abort",
    );

    if (!confirmation.isConfirmed) return;

    try {
      setIsSending(true);

      // EmailJS REST API Integration with provided credentials
      const serviceId = "service_8velmx9";
      const templateId = "template_a0wk1gc";
      const publicKey = "BzozWlALRBbkLIfg1";

      const data = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      };

      const response = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data,
      );

      if (response.status === 200) {
        await showSuccess("Sent!", "Your message has been sent successfully.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      showError(
        "Error!",
        `Failed to send: ${error.response?.data || error.message || "Communication disrupted."}`,
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <PageHeader pageInfo={pageInfo} />

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT COLUMN: INFO & MAP */}
          <div className="space-y-12 animate-in fade-in slide-in-from-left duration-1000">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-black  tracking-tighter leading-none mb-6">
                Our <span className="text-accent text-outline">Location</span>
              </h2>
            </div>

            {/* STYLIZED MAP CONTAINER */}
            <div className="relative group">
              {/* Technical Decorative Corner */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-accent z-20"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-accent z-20"></div>

              <div className="relative overflow-hidden border border-base-content/10 shadow-2xl rounded-sm group-hover:border-accent transition-colors duration-500">
                <div className="absolute inset-0 bg-accent/5 pointer-events-none z-10 group-hover:opacity-0 transition-opacity"></div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6111.360186199436!2d88.59752070307306!3d24.38699025681104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbee50b5340bdf%3A0x8318fe0ba1480160!2sCantonment%20Rd%2C%20Rajshahi!5e0!3m2!1sen!2sbd!4v1775564540664!5m2!1sen!2sbd"
                  className="w-full h-[400px] grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Scanner Overlay Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-accent/20 shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] animate-scan z-20"></div>
              </div>
            </div>

            {/* CONTACT INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-base-200/50 backdrop-blur-md border-l-4 border-accent space-y-4 hover:bg-base-200 transition-colors cursor-default">
                <div className="flex items-center gap-3 text-accent">
                  <span className="material-icons text-xl">location_on</span>
                  <span className="text-[10px] font-black  tracking-[0.3em]">
                    Headquarters
                  </span>
                </div>
                <p className="text-sm font-bold  leading-tight tracking-tight">
                  Cantonment road
                  <br />
                  Rajshahi-6000, BD
                </p>
              </div>

              <div className="p-8 bg-base-200/50 backdrop-blur-md border-l-4 border-accent space-y-4 hover:bg-base-200 transition-colors cursor-default">
                <div className="flex items-center gap-3 text-accent">
                  <span className="material-icons text-xl">
                    alternate_email
                  </span>
                  <span className="text-[10px] font-black  tracking-[0.3em]">
                    Communication
                  </span>
                </div>
                <p className="text-sm font-bold  leading-tight tracking-tight">
                  +880 (19) 11-756854
                  <br />
                  foysalcse033@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="animate-in fade-in slide-in-from-right duration-1000">
            <div className="bg-base-200 p-10 md:p-16 border border-base-content/5 relative overflow-hidden group">
              {/* Background Accent Gradient */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-700"></div>

              <h3 className="relative z-10 font-heading text-3xl font-black  tracking-tighter mb-12">
                DEPLOY A <span className="text-accent">MESSAGE</span>
              </h3>

              <form
                ref={formRef}
                className="relative z-10 space-y-8"
                onSubmit={handleSendEmail}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black  tracking-[0.2em] opacity-40">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="ENTER FULL NAME"
                      className={`w-full bg-base-100 border-2 p-4 text-xs font-bold outline-none transition-all placeholder:opacity-20  tracking-widest ${errors.name ? "border-red-600 animate-pulse" : "border-transparent focus:border-accent"}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black  tracking-[0.2em] opacity-40">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="USER@CENTER.COM"
                      className={`w-full bg-base-100 border-2 p-4 text-xs font-bold outline-none transition-all placeholder:opacity-20  tracking-widest ${errors.email ? "border-red-600 animate-pulse" : "border-transparent focus:border-accent"}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black  tracking-[0.2em] opacity-40">
                    Contact Number
                  </label>
                  <input
                    name="phone"
                    type="number"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="ENTER PHONE"
                    className="w-full bg-base-100 border-2 border-transparent focus:border-accent p-4 text-xs font-bold outline-none transition-all placeholder:opacity-20  tracking-widest"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black  tracking-[0.2em] opacity-40">
                    Please explain <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="PLEASE DETAIL YOUR REQUEST..."
                    className={`w-full bg-base-100 border-2 p-4 text-xs font-bold outline-none transition-all placeholder:opacity-20  tracking-widest resize-none ${errors.message ? "border-red-600 animate-pulse" : "border-transparent focus:border-accent"}`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-base-content text-base-100 py-4 font-heading font-black  tracking-[0.5em] text-xs hover:bg-accent hover:text-white transition-all shadow-xl shadow-black/10 relative overflow-hidden group/btn disabled:opacity-50 rounded-full"
                >
                  <span className="relative z-10">
                    {isSending ? "Sending..." : "Send Message"}
                  </span>
                  <div className="absolute inset-0 bg-accent -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
