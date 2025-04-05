import minimist from "minimist";

export function parseConfigVars() {
  const args = minimist(process.argv.slice(2));

  // Command line args take precedence
  return {
    proj: args.proj || args.p,
    env: args.env || args.e,
    type: args.type || args.t,
    output: args.output || args.o,
  };
}
