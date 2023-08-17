import namedColors from "color-name-list";
// here genarating the hex code for the product...

export const colorCodes = (allColorsPresent) => {
  let colors = [];
  allColorsPresent.forEach((item) => {
    let hexCode = namedColors.find((color) => color.name === item);
    if (!hexCode) {
      return;
    }
    colors.push({ code: hexCode.hex, colorName: hexCode.name });
  });

  return colors;
};
