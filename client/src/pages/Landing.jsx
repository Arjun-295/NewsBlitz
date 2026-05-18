import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Newspaper, 
  Zap, 
  BookOpen, 
  Shield, 
  Sparkles, 
  Globe, 
  Layers, 
  Github, 
  Cpu 
} from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2123] via-[#2e3032] to-[#121314] text-white overflow-hidden relative font-sans">
      
      {/* 🔮 Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 🧭 Sticky Premium Header */}
      <header className="sticky top-0 z-50 w-full bg-black/10 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-indigo-500 to-amber-500 p-2 rounded-xl text-white shadow-md">
            <Zap className="size-6 text-yellow-300 fill-yellow-300" />
          </div>
          <span className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            NewsBlitz
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/user/login" 
            className="text-gray-300 hover:text-white font-medium transition px-4 py-2 hover:bg-white/5 rounded-xl"
          >
            Sign In
          </Link>
          <Link 
            to="/user/register" 
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-indigo-500/20 transition duration-300 active:scale-95"
          >
            Join Blitz
          </Link>
        </div>
      </header>

      {/* 🚀 Hero Section */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 relative z-10">
        
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-300 mb-8"
            variants={itemVariants}
          >
            <Sparkles className="size-4 text-amber-400" />
            <span>THE NEXT-GEN TECH FEEDS TERMINAL</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-[1.1] mb-8"
            variants={itemVariants}
          >
            Stay Ahead of the Tech Curve with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-300">
              NewsBlitz
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            A unified, lightning-fast dashboard that aggregates premium tech publications, strips the noise, and lets you capture key insights instantly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <Link 
              to="/user/register" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-indigo-500/30 transition duration-300 group active:scale-95"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="size-5 group-hover:translate-x-1 transition duration-200" />
            </Link>
            
            <Link 
              to="/user/login" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition duration-300"
            >
              <span>Explore Dashboard</span>
            </Link>
          </motion.div>

        </motion.div>

        {/* 💻 Glassmorphic UI Preview */}
        <motion.div 
          className="relative max-w-5xl mx-auto border border-white/10 rounded-2xl bg-black/25 backdrop-blur-md p-2 shadow-2xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.6 }}
        >
          {/* Mac Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5 rounded-t-xl">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-gray-500 ml-4 font-mono select-none">newsblitz.vercel.app/user/news-feed</span>
          </div>
          
          {/* Mock App Interface */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-b from-white/[0.02] to-transparent rounded-b-xl">
            <div className="md:col-span-2 space-y-4">
              <div className="h-6 w-1/3 bg-white/10 rounded-md animate-pulse" />
              <div className="space-y-3">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                  <div className="h-4 w-1/4 bg-amber-400/20 rounded" />
                  <div className="h-5 w-3/4 bg-white/10 rounded" />
                  <div className="h-3 w-1/2 bg-white/5 rounded" />
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                  <div className="h-4 w-1/4 bg-indigo-400/20 rounded" />
                  <div className="h-5 w-5/6 bg-white/10 rounded" />
                  <div className="h-3 w-2/3 bg-white/5 rounded" />
                </div>
              </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-4">
              <div className="h-5 w-1/2 bg-white/10 rounded" />
              <div className="space-y-2">
                <div className="h-10 w-full bg-white/5 rounded-lg border border-white/5 flex items-center px-3 text-xs text-gray-500">Capture technical summaries...</div>
                <div className="h-8 w-1/3 bg-indigo-600/50 rounded-lg ml-auto" />
              </div>
              <div className="pt-2 border-t border-white/5 space-y-2">
                <div className="h-12 w-full bg-black/20 rounded-lg flex items-center px-3 justify-between">
                  <div className="h-4 w-1/2 bg-white/10 rounded" />
                  <div className="h-4 w-4 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ⚡ Features Grid Section */}
        <section className="mt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineered for Technical Minds</h2>
            <p className="text-gray-400">Tired of ads, endless scrolls, and clickbaits? Get tech insights straight from raw API streams with full focus control.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 hover:border-indigo-500/25 transition duration-300 flex flex-col gap-4 shadow-lg group"
              variants={cardVariants}
            >
              <div className="bg-indigo-600/10 p-3.5 rounded-xl text-indigo-400 w-fit group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                <Globe className="size-6" />
              </div>
              <h3 className="font-bold text-xl">Aggregated Tech</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Aggregates real-time feeds from prime publications like TechCrunch, Wired, Digital Trends and The Verge.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 hover:border-indigo-500/25 transition duration-300 flex flex-col gap-4 shadow-lg group"
              variants={cardVariants}
            >
              <div className="bg-amber-600/10 p-3.5 rounded-xl text-amber-400 w-fit group-hover:bg-amber-600 group-hover:text-white transition duration-300">
                <BookOpen className="size-6" />
              </div>
              <h3 className="font-bold text-xl">Insight Notebook</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Jot down architectural, engineering, or startup notes next to the articles you digest. Never forget key ideas.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 hover:border-indigo-500/25 transition duration-300 flex flex-col gap-4 shadow-lg group"
              variants={cardVariants}
            >
              <div className="bg-purple-600/10 p-3.5 rounded-xl text-purple-400 w-fit group-hover:bg-purple-600 group-hover:text-white transition duration-300">
                <Cpu className="size-6" />
              </div>
              <h3 className="font-bold text-xl">Vite-Charged</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                No hydration lag, zero delays. Experience sub-100ms client-side page speeds and immediate API synchronization.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 hover:border-indigo-500/25 transition duration-300 flex flex-col gap-4 shadow-lg group"
              variants={cardVariants}
            >
              <div className="bg-emerald-600/10 p-3.5 rounded-xl text-emerald-400 w-fit group-hover:bg-emerald-600 group-hover:text-white transition duration-300">
                <Shield className="size-6" />
              </div>
              <h3 className="font-bold text-xl">100% Ad-Free</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Clean interface designed specifically for pure content reading. No banner ads, newsletter popups, or cookies banners.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* 📢 Join CTA Section */}
        <section className="mt-36 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl pointer-events-none" />
          <div className="relative border border-white/10 bg-white/[0.02] backdrop-blur-lg p-10 md:p-16 rounded-3xl text-center max-w-4xl mx-auto shadow-2xl">
            <h2 className="text-4xl font-extrabold mb-6">Ready to Experience Zero Noise?</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              Create your secure profile, access real-time feeds, and start curating your professional tech bookmarks now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/user/register" 
                className="w-full sm:w-auto bg-white text-gray-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-100 transition duration-300 active:scale-95"
              >
                Join Now for Free
              </Link>
              <Link 
                to="/user/login" 
                className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition duration-300"
              >
                Sign In to Account
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* 🏁 Footer Section */}
      <footer className="border-t border-white/5 bg-black/20 py-12 px-6 md:px-12 mt-20 relative z-10 text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="size-5 text-indigo-400 fill-indigo-400/50" />
            <span className="font-bold text-white tracking-wider">NewsBlitz</span>
          </div>
          
          <div className="flex gap-6 text-gray-400">
            <Link to="/user/login" className="hover:text-white transition">Dashboard</Link>
            <Link to="/user/register" className="hover:text-white transition">Register</Link>
            <a href="https://github.com/Arjun-295/NewsBlitz" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1.5">
              <Github className="size-4" /> Github
            </a>
          </div>
          
          <div>
            &copy; {new Date().getFullYear()} NewsBlitz. Built for developers.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Landing;
