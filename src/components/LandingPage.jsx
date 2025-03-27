import React, { useEffect } from "react";
import { Notebook, Check, Lock, Sparkles, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const status = useSelector((state) => state.authReducer.status);
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Capture Your Thoughts, Organize Your Life
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              The simple, powerful way to take notes and stay organized. Access
              your notes anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              <button onClick={() => navigate("/home")} className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-200 flex items-center group">
                Start Taking Notes
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80"
              alt="Notebook and coffee"
              className="rounded-lg shadow-2xl opacity-90 hover:opacity-100 transition duration-200"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-16" id="features">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Everything you need in a note-taking App
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200">
              <Sparkles className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Simple & Intuitive
              </h3>
              <p className="text-gray-300">
                Clean interface that lets you focus on what matters - your
                notes.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200">
              <Lock className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Secure by Default
              </h3>
              <p className="text-gray-300">
                Your notes are encrypted and only accessible by you.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200">
              <Check className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Sync Everywhere
              </h3>
              <p className="text-gray-300">
                Access your notes from any device, always in sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who trust MyNotes for their note-taking
            needs.
          </p>
          <button onClick={() => navigate("/home")} className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition duration-200 font-medium">
            {status ? "start by creating your first note!" : "Create Your Free Account"}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Notebook className="h-6 w-6 text-purple-400" />
              <span className="text-lg font-semibold text-white">MyNotes</span>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © {new Date().getFullYear()} MyNotes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
