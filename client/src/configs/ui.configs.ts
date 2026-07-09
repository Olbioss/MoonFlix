const uiConfigs = {
  style: {
    gradientBgImage: {
      backgroundImage:
        "linear-gradient(to top, rgba(10,13,21,1), rgba(10,13,21,0))",
    },
    horizontalGradientBgImage: {
      backgroundImage:
        "linear-gradient(to right, rgba(10,13,21,0.95), rgba(10,13,21,0))",
    },
    typoLines: (lines: number, textAlign?: string) => ({
      textAlign: textAlign || "justify",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: lines,
    }),
    mainContent: {
      maxWidth: "1366px",
      margin: "auto",
      padding: 2,
    },
    backgroundImage: (imgPath: string) => ({
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "#131A29",
      backgroundImage: `url(${imgPath})`,
    }),
  },
  size: {
    sidebarWidth: "300px",
    railWidth: "72px",
    contentMaxWidth: "1366px",
  },
};

export default uiConfigs;
