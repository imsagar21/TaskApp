import React from "react";

const Footer: React.FC = () => (
  <div className="mt-10 text-center text-gray-400 text-sm">
    &copy; {new Date().getFullYear()} Task Management App. All rights reserved.
  </div>
);

export default Footer;
