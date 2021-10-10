const invert = (obj) =>
  Object.entries(obj).reduce((acc, [key, val]) => ({ ...acc, [val]: key }), {});

console.log(invert({ a: "some", b: "object", c: 1 })); // { 'some': 'a', 'object': 'b', '1': 'c' }
