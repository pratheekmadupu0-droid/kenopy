"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Home, CheckCircle2, ArrowRight } from "lucide-react";

export default function BookingCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    sanctuary: "canopy",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="booking" className="relative w-full py-24 md:py-32 bg-[#05100d] overflow-hidden px-6 md:px-12 border-t border-[#efeae2]/5">
      
      {/* Interactive Background Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] md:w-[650px] h-[450px] md:h-[650px] bg-[#a07855]/15 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-[1px] bg-[#a07855]" />
            <span className="font-space text-xs tracking-[0.3em] uppercase text-[#a07855] font-semibold">
              Secure Your Sanctuary
            </span>
            <span className="w-8 h-[1px] bg-[#a07855]" />
          </div>
          <h2 className="font-space text-4xl md:text-6xl font-bold tracking-tight text-[#efeae2]">
            Begin the journey.
          </h2>
          <p className="font-inter text-sm md:text-base text-[#efeae2]/60 max-w-lg leading-relaxed font-light mt-2">
            Select your coordinates, dates, and party size. Our concierge will contact you within 2 hours to confirm your custom transit flight.
          </p>
        </div>

        <div className="w-full p-8 md:p-12 rounded-3xl border border-[#efeae2]/5 bg-[#091b15]/20 backdrop-blur-md relative overflow-hidden shadow-2xl">
          {/* Tech Grid Overlay inside booking card */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="w-full h-full bg-[linear-gradient(to_right,#efeae2_1px,transparent_1px),linear-gradient(to_bottom,#efeae2_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10"
              >
                {/* Selection */}
                <div className="flex flex-col gap-2.5">
                  <label className="font-space text-[10px] tracking-widest uppercase text-[#a07855]">
                    Select Sanctuary
                  </label>
                  <div className="relative">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#efeae2]/40" />
                    <select
                      value={formData.sanctuary}
                      onChange={(e) => setFormData({ ...formData, sanctuary: e.target.value })}
                      className="w-full bg-[#05100d] border border-[#efeae2]/10 rounded-xl py-3.5 pl-11 pr-4 font-inter text-sm text-[#efeae2] focus:outline-none focus:border-[#a07855]/70 appearance-none transition-all cursor-pointer"
                    >
                      <option value="canopy">The A-Frame Canopy ($450 / night)</option>
                      <option value="obsidian">The Obsidian Pavilion ($620 / night)</option>
                      <option value="dome">The Solitude Dome ($380 / night)</option>
                    </select>
                  </div>
                </div>

                {/* Guests */}
                <div className="flex flex-col gap-2.5">
                  <label className="font-space text-[10px] tracking-widest uppercase text-[#a07855]">
                    Party Size
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#efeae2]/40" />
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-[#05100d] border border-[#efeae2]/10 rounded-xl py-3.5 pl-11 pr-4 font-inter text-sm text-[#efeae2] focus:outline-none focus:border-[#a07855]/70 appearance-none transition-all cursor-pointer"
                    >
                      <option value="1">1 Explorer</option>
                      <option value="2">2 Explorers</option>
                      <option value="4">4 Explorers (Dual Suite)</option>
                    </select>
                  </div>
                </div>

                {/* Check In */}
                <div className="flex flex-col gap-2.5">
                  <label className="font-space text-[10px] tracking-widest uppercase text-[#a07855]">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#efeae2]/40" />
                    <input
                      type="date"
                      required
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full bg-[#05100d] border border-[#efeae2]/10 rounded-xl py-3.5 pl-11 pr-4 font-inter text-sm text-[#efeae2] focus:outline-none focus:border-[#a07855]/70 transition-all cursor-pointer"
                    />
                  </div>
                </div>

                {/* Check Out */}
                <div className="flex flex-col gap-2.5">
                  <label className="font-space text-[10px] tracking-widest uppercase text-[#a07855]">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#efeae2]/40" />
                    <input
                      type="date"
                      required
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full bg-[#05100d] border border-[#efeae2]/10 rounded-xl py-3.5 pl-11 pr-4 font-inter text-sm text-[#efeae2] focus:outline-none focus:border-[#a07855]/70 transition-all cursor-pointer"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="md:col-span-2 mt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-space text-[10px] tracking-[0.25em] uppercase font-bold bg-gradient-to-r from-[#a07855] to-[#efeae2] text-[#05100d] hover:shadow-[0_0_30px_rgba(160,120,85,0.4)] transition-all duration-500 flex items-center justify-center gap-2 hover-magnetic"
                  >
                    Confirm Cabin Request <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-10 gap-4 relative z-10"
              >
                <CheckCircle2 className="w-16 h-16 text-[#bfff44] animate-bounce" />
                <h3 className="font-space text-2xl font-bold text-[#efeae2] mt-2">
                  Sanctuary Requested.
                </h3>
                <p className="font-inter text-sm text-[#efeae2]/70 max-w-sm leading-relaxed font-light">
                  A representative from our private concierge department will contact you at your coordinates within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full border border-[#efeae2]/25 text-[#efeae2]/70 font-space text-[10px] tracking-wider uppercase hover:bg-[#efeae2]/5 hover:text-[#efeae2] transition-colors"
                >
                  Edit Request
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
