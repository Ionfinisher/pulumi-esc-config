export function parseConfigVars() {
  const npmVars = {};
  Object.keys(process.env).forEach((key) => {
    if (key.startsWith("npm_config_")) {
      // Remove the npm_config_ prefix
      const varName = key.replace("npm_config_", "");
      // Skip internal npm config vars
      if (!varName.includes("_") && !varName.match(/^[0-9]/)) {
        npmVars[varName] = process.env[key];
      }
    }
  });
  return npmVars;
}
