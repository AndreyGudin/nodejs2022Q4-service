import { authRoutes } from '../endpoints';

const createUserDto = {
<<<<<<< HEAD
  login: 'TEST_LOGIN',
=======
  login: 'TEST_AUTH_LOGIN',
>>>>>>> 2e92b263cdcbc29a187b0409783d8d6fb7c7ade2
  password: 'Tu6!@#%&',
};

const getTokenAndUserId = async (request) => {
  // create user
<<<<<<< HEAD
  const response = await request
=======
  const {
    body: { id: mockUserId },
  } = await request
>>>>>>> 2e92b263cdcbc29a187b0409783d8d6fb7c7ade2
    .post(authRoutes.signup)
    .set('Accept', 'application/json')
    .send(createUserDto);

<<<<<<< HEAD
  const mockUserId = response.body.id;

  // get token
  const response2 = await request
=======
  // get token
  const {
    body: { accessToken },
  } = await request
>>>>>>> 2e92b263cdcbc29a187b0409783d8d6fb7c7ade2
    .post(authRoutes.login)
    .set('Accept', 'application/json')
    .send(createUserDto);

<<<<<<< HEAD
  const token = `Bearer ${response2.body.accessToken}`;
=======
  if (mockUserId === undefined || accessToken === undefined) {
    throw new Error('Authorization is not implemented');
  }

  const token = `Bearer ${accessToken}`;
>>>>>>> 2e92b263cdcbc29a187b0409783d8d6fb7c7ade2

  return { token, mockUserId };
};

export default getTokenAndUserId;
