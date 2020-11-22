//it's the glue between Tailwind CSS and Styled Components
//which helps to transform Tailwind classes into CSS-in-JS code
module.exports = {
    tailwind: {
        plugins: ["macros"],
        config: "./src/tailwind.config.js",
        format: "auto"
    }
};
