const colors = {
accent: "#1D3354",
primary: "#6CBF8E",
secondary: "#F9C22E",
tertiary: "#6CBF8E",
black: "#2F2F2F",
white: "#FFFFFF",
gray: "#BDBFC7",
gray2: "#D8D8D8",
gray3: "#F0F0F0",
gray4: "#F7F8FA",
};

const sizes = {
// global sizes
base: 16,
font: 14,
border: 15,
padding: 15,

// font sizes
h1: 32,
h2: 29,
h3: 19,
title: 18,
header: 24,
body: 12,
caption: 12,
small: 8,
};

const fonts = {
h1: {
fontFamily: "Rubik-Light",
fontSize: sizes.h1
},
h2: {
fontFamily: "Rubik-Medium",
fontSize: sizes.h2
},
h3: {
fontFamily: "Rubik-Regular",
fontSize: sizes.h3
},
title: {
fontFamily: "Rubik-Regular",
fontSize: sizes.title
},
header: {
fontFamily: "Rubik-Bold",
fontSize: sizes.header
},
body: {
fontSize: sizes.body
},
caption: {
fontSize: sizes.caption
},
small: {
fontSize: sizes.small
}
};

export { colors, sizes, fonts };