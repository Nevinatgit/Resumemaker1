import React from 'react';

export default function Footer() {
  return (
    <div style={footerStyle}>
      <div style={containerStyle}>
        <div style={infoSectionStyle}>
          <h3 style={footerTitleStyle}>Company Name</h3>
          <p style={footerTextStyle}>123 Street Name, City, Country</p>
          <p style={footerTextStyle}>Contact: info@company.com</p>
        </div>

        <div style={linksSectionStyle}>
          <h3 style={footerTitleStyle}>Quick Links</h3>
          <ul style={linksListStyle}>
            <li><a href="/" style={linkStyle}>Home</a></li>
            <li><a href="/about" style={linkStyle}>About</a></li>
            <li><a href="/services" style={linkStyle}>Services</a></li>
            <li><a href="/contact" style={linkStyle}>Contact</a></li>
          </ul>
        </div>

        <div style={socialMediaSectionStyle}>
          <h3 style={footerTitleStyle}>Follow Us</h3>
          <div style={socialIconsStyle}>
            <a href="https://facebook.com" style={socialIconStyle}>Facebook</a>
            <a href="https://twitter.com" style={socialIconStyle}>Twitter</a>
            <a href="https://linkedin.com" style={socialIconStyle}>LinkedIn</a>
          </div>
        </div>
      </div>
      <div style={copyrightStyle}>
        <p style={footerTextStyle}>© 2025 Company Name. All rights reserved.</p>
      </div>
    </div>
  );
}

const footerStyle = {
  width: '100%',
  backgroundColor: '#F8FAFC', // Changed background color to #F8FAFC
  color: '#333', // Dark color text for better contrast on light background
  padding: '50px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '80%',
  maxWidth: '1200px',
  marginBottom: '20px',
};

const infoSectionStyle = {
  flex: 1,
};

const linksSectionStyle = {
  flex: 1,
};

const socialMediaSectionStyle = {
  flex: 1,
};

const footerTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const footerTextStyle = {
  fontSize: '1rem',
  marginBottom: '10px',
};

const linksListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const linkStyle = {
  color: '#333', // Dark text for links to maintain readability
  textDecoration: 'none',
  marginBottom: '8px',
  display: 'block',
  fontSize: '1rem',
};

const socialIconsStyle = {
  display: 'flex',
  gap: '20px',
};

const socialIconStyle = {
  color: '#333', // Dark text for social icons
  textDecoration: 'none',
  fontSize: '1.1rem',
};

const copyrightStyle = {
  width: '100%',
  textAlign: 'center',
  padding: '20px 0',
  background: '#E4E4E4', // A subtle background for the copyright section
};
