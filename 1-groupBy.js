const groupBy = (array, func) =>
  array.reduce((acc, item) => {
    const key = func(item);

    const group = acc[key];

    if (group) group.push(item);
    else acc[key] = [item];

    return acc;
  }, {});

console.log(groupBy([3.6, 3.7, 6.4, 8.9], Math.floor)); // { '3': [3.6, 3.7], '6': [6.4], '8': [8.9] }
