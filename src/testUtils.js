import Chance from 'chance';

// Use a known, constant seed so that we get repeatable
// results and thus repeatable tests.
const chance = new Chance("We want repeatable tests");

function getMockFormSubmission(data={}) {
  return {
    id: chance.guid(),
    data: {
      email: chance.email(),
      firstName: chance.first(),
      lastName: chance.last(),
      liked: false,
      ...data,
    },
  };
}

export {
  getMockFormSubmission,
}