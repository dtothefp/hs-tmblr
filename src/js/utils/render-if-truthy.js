/**
 * Render a React component or return null if arguments are falsy
 * @param {Array} args arguments
 * @param {Function} cb last argument funtion that returns React component
 * @return {Null|ReactComponent}
 */
export default function(...args) {
  const checks = args.slice(0, args.length - 1);
  const [cb] = args.slice(-1);
  const truthy = checks.reduce((prev, next) => prev === !!next, true);

  return truthy ? cb() : null;
}
