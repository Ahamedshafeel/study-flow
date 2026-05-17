import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer" style={{ padding: '12px 20px', textAlign: 'center', color: '#6b7280' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        © {new Date().getFullYear()} StudyPlanner — Developed by Ahamed shafeel , prasanna kumar , myvizhikannan
      </div>
    </footer>
  );
};

export default Footer;
