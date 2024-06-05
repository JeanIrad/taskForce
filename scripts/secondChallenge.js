function transformString(str) {
  const length = str.length;

  if (length % 15 === 0) {
    return str
      .split("")
      .reverse()
      .map((char) => char.charCodeAt(0))
      .join(" ");
  } else if (length % 3 === 0) {
    return str.split("").reverse().join("");
  } else if (length % 5 === 0) {
    return str
      .split("")
      .map((char) => char.charCodeAt(0))
      .join(" ");
  } else {
    // No transformation required
    return str;
  }
}
