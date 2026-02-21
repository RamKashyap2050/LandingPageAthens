import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footerInner">
        {/* Brand */}
        <div className="footerCol">
          <div className="footerBrand">
            <div className="logoCircle">
              <img
                src="https://lh3.googleusercontent.com/a-/ALV-UjW5impQlIbs5ZVW5ZrbDnWx4Xxt-6VQJMNzb5aRwQQxg0Nh1Lo=s240-p-k-rw-no"
                alt="Athens Souvlaki logo"
                className="logoImage"
              />
            </div>
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
            5897 Victoria Ave
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
          <p className="footerText">Mon – Sun: 11:00 AM – 10:00 PM</p>
        </div>

        {/* Order */}
        <div className="footerCol">
          <div className="footerTitle">Order From</div>

          <a
            href="https://www.ubereats.com/ca/store/athens-souvlaki-bar-%26-grill-5897-avenue-victoria/06ugDFP1SOmXlQpJVMur8w?diningMode=DELIVERY&sc=SEARCH_SUGGESTION"
            target="_blank"
            rel="noreferrer"
            className="uberEatsBtn"
            aria-label="Order from Uber Eats"
          >
            <img
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/3b/1d/d2/3b1dd208-38c5-5d30-d56f-2584ba1a42ce/AppIcon-0-0-1x_U007emarketing-0-8-0-0-sRGB-85-220.png/1200x630wa.png"
              alt="Uber Eats"
              className="uberEatsLogo"
            />
            <span>Order on Uber Eats</span>
          </a>
          <br />
          <br />
          <a
            href="https://www.doordash.com/store/athens-souvlaki-bar-&-grill-montr%C3%A9al-40235493/96340973/?event_type=autocomplete&pickup=false"
            target="_blank"
            rel="noreferrer"
            className="uberEatsBtn"
            aria-label="Order from Uber Eats"
          >
            <img
              src="https://logosmarcas.net/wp-content/uploads/2020/11/DoorDash-Emblema.png"
              alt="DoorDash"
              className="uberEatsLogo"
            />
            <span>Order on Doordash</span>
          </a>
        </div>
      </div>

      <div className="footerBottom">
        © {year} Athens Souvlaki. All rights reserved.
      </div>
    </footer>
  );
}
