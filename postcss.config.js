module.exports = (context) => ({
  map: context.options.map, // respects cli flags --map and --no-map
  plugins: {
	'postcss-import': {},
	'postcss-custom-properties': { preserve: false },
  }
})
