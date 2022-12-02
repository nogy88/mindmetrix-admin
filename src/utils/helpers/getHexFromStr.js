export const getHexFromStr = (text) => {
  const myHex = Array.from(text)
    .map((c) =>
      c.charCodeAt(0) < 128
        ? c.charCodeAt(0).toString(16)
        : encodeURIComponent(c).replace(/\%/g, "").toLowerCase()
    )
    .join("");

  return myHex.slice(2, 8).padEnd(6, "0");
};
