import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footerInner">
        {/* Brand */}
        <div className="footerCol">
          <div className="footerBrand">
            <div className="footerLogo">AS</div>
            <div>
              <div className="footerName">Athens Souvlaki</div>
              <div className="footerTagline">Authentic Greek Cuisine</div>
            </div>
          </div>

          <p className="footerDesc">
            Fresh, authentic Greek flavors served with passion. From classic
            gyros to chef’s creations, Athens Souvlaki brings the taste of
            Greece to Montreal.
          </p>
        </div>

        {/* Location */}
        <div className="footerCol">
          <div className="footerTitle">Location</div>
          <p className="footerText">
            5495 Victoria Ave
            <br />
            Montreal, QC
          </p>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="footerLink"
          >
            Get Directions
          </a>
        </div>

        {/* Hours */}
        <div className="footerCol">
          <div className="footerTitle">Hours</div>
          <p className="footerText">
            Mon – Thu: 11:00 AM – 10:00 PM
            <br />
            Fri – Sat: 11:00 AM – 11:00 PM
            <br />
            Sun: 12:00 PM – 9:00 PM
          </p>
        </div>

        {/* Contact */}
        <div className="footerCol">
          <div className="footerTitle">Contact</div>
          <p className="footerText">
            Phone: (514) 555-1234
            <br />
            Email: info@athenssouvlaki.com
          </p>

          <div className="footerSocials">
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
            <a href="#" aria-label="Facebook">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        © {year} Athens Souvlaki. All rights reserved.
      </div>
    </footer>
  );
}
