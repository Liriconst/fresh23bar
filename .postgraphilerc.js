module.exports = {
  options: {
	appendPlugins: ["postgraphile-plugin-connection-filter"],
    connection: "postgres://postgres:7898@localhost:5432/fresh23bar",
	cors: true,
	watch: true
  },
};