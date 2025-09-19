import React from 'react';
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalcomPopupButton({
  calLink = "evanjacobson",
  children = "Schedule a Call",
  className = "",
  theme = "dark",
  ...props
}) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: theme,
        styles: {
          branding: { brandColor: "#10b981" }, // emerald-500
        },
      });
    })();
  }, [theme]);

  return (
    <button
      data-cal-link={calLink}
      data-cal-config={JSON.stringify({ theme })}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}