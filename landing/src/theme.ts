// JurisCards' colours for the parts that take them as props (WebGL, canvas, SVG).
// Keep in step with theme.css.
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/dm-sans";

export const theme = {
  accent: "#C9A45C",
  onAccent: "#071525",
  aurora: ["#1B3A5C", "#C9A45C", "#1B3A5C"],
  gradient: ["#E0C27D", "#F7F5EF", "#E0C27D"],
  shiny: "#CBD3DC",
  shine: "#FFFFFF",
  star: { color: "#F7F5EF", trail: "#E0C27D" },
  wire: ["#CBD3DC", "#C9A45C"] as [string, string],
  spotlight: "rgba(201, 164, 92, 0.14)",
};
