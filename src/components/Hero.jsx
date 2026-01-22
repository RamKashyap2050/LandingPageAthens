import React, { useMemo } from "react";
import {
  format,
  getDay,
  isAfter,
  isBefore,
  setHours,
  setMinutes,
} from "date-fns";

const HOURS = {
  0: { open: "12:00", close: "21:00" }, // Sunday
  1: { open: "11:00", close: "22:00" }, // Monday
  2: { open: "11:00", close: "22:00" },
  3: { open: "11:00", close: "22:00" },
  4: { open: "11:00", close: "22:00" },
  5: { open: "11:00", close: "23:00" }, // Friday
  6: { open: "11:00", close: "23:00" }, // Saturday
};

function getStatus(now = new Date()) {
  const day = getDay(now);
  const hours = HOURS[day];

  if (!hours) return { isOpen: false, label: "Closed" };

  const [openH, openM] = hours.open.split(":").map(Number);
  const [closeH, closeM] = hours.close.split(":").map(Number);

  const openTime = setMinutes(setHours(now, openH), openM);
  const closeTime = setMinutes(setHours(now, closeH), closeM);

  const isOpen = isAfter(now, openTime) && isBefore(now, closeTime);

  if (isOpen) {
    return {
      isOpen: true,
      label: `Open • Closes at ${format(closeTime, "h:mm a")}`,
    };
  }

  // If closed, show next opening time (today or tomorrow)
  const nextOpen = isBefore(now, openTime)
    ? openTime
    : (() => {
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        const tDay = getDay(tomorrow);
        const tHours = HOURS[tDay];
        if (!tHours) return null;

        const [h, m] = tHours.open.split(":").map(Number);
        return setMinutes(setHours(tomorrow, h), m);
      })();

  return {
    isOpen: false,
    label: nextOpen
      ? `Closed • Opens ${format(nextOpen, "EEE h:mm a")}`
      : "Closed",
  };
}

export default function Hero() {
  const status = useMemo(() => getStatus(), []);

  return (
    <div className="hero">
      <div className="heroOverlay" />

      <div className="heroInner">
        <div className="logoCircle" aria-hidden="true">
          AS
        </div>

        <div>
          <h1 className="heroTitle">Athens Souvlaki</h1>

          <div className="heroMeta">
            <span className="pill">Delivery</span>
            <span className="pill pillGhost">Pickup</span>
          </div>

          <div className="heroSub">
            <span className={status.isOpen ? "statusOpen" : "statusClosed"}>
              {status.label}
            </span>
          </div>

          <div className="heroSub2">
            5897 Victoria Ave, Montreal <span className="muted">•</span>{" "}
            <a className="link" href="#" onClick={(e) => e.preventDefault()}>
              More Info
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
