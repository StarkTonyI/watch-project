// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" border-t-2 text-gray-300 h-[50vh] flex flex-col justify-between p-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row justify-between items-start gap-10"
      >
        {/* Brand / About */}
        <div className="max-w-sm">
          <h2 className="text-3xl font-bold text-white mb-3">CoolFooter Inc.</h2>
          <p className="text-gray-400 leading-relaxed">
            Making the web a cooler place, one footer at a time. We craft slick
            UI components with love, caffeine, and way too many commits.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Services</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaGithub /></a>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="border-t border-gray-700 pt-5 text-center text-gray-500"
      >
        © {new Date().getFullYear()} CoolFooter Inc. — All rights reserved.
      </motion.div>
    </footer>
  );
}
