import exp from 'constants';
import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import { UserInput } from '../../types';

const userInput: UserInput = {
    id: 1,
    username: 'John',
    password: 'johnpassword',
    email: 'john@gmail.com',
    role: 'user',
};
const user = new User({
    ...userInput,
});

let createUserMock: jest.Mock;
let getUserByUsernameMock: jest.Mock;
let deleteUserMock: jest.Mock;

beforeEach(() => {
    createUserMock = jest.fn();
    getUserByUsernameMock = jest.fn();
    deleteUserMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: valid values for user, when: user is created, then: user is created', async () => {
    //given
    userDb.createUser = createUserMock;
    userDb.getUserByUsername = getUserByUsernameMock;

    //when
    const userJohn = new User({
        id: 1,
        username: 'John',
        password: 'johnpassword',
        email: 'john@gamil.com',
        role: 'user',
    });
    getUserByUsernameMock.mockReturnValue(userJohn);
    await userDb.createUser(userJohn);
    await userDb.getUserByUsername({ username: 'John' });

    //then
    expect(createUserMock).toHaveBeenCalledTimes(1);
    expect(createUserMock).toHaveBeenCalledWith(userJohn);
    expect(getUserByUsernameMock).toHaveBeenCalledTimes(1);
    expect(getUserByUsernameMock).toHaveBeenCalledWith({ username: 'John' });
    expect(getUserByUsernameMock).toHaveReturnedWith(userJohn);
});

test('given a valid username, when searching a user, then return the user', async () => {
    //given
    userDb.getUserByUsername = getUserByUsernameMock;
    getUserByUsernameMock.mockReturnValue(user);

    //when
    const result = await userDb.getUserByUsername({ username: 'John' });

    //then
    expect(getUserByUsernameMock).toHaveBeenCalledTimes(1);
    expect(getUserByUsernameMock).toHaveBeenCalledWith({ username: 'John' });
    expect(result).toEqual(user);
    expect(getUserByUsernameMock).toHaveReturnedWith(user);
});

test('given a valid user ID, when deleting a user, then return true', async () => {
    //given
    const userId = 1;
    const mockDeleteUser = jest.fn().mockResolvedValue(true);
    userDb.deleteUser = mockDeleteUser;

    //when
    const result = await userDb.deleteUser(userId);

    //then
    expect(mockDeleteUser).toHaveBeenCalledTimes(1);
    expect(mockDeleteUser).toHaveBeenCalledWith(userId);
    expect(result).toBe(true);
});

test('given an invalid user ID, when deleting a user, then return false', async () => {
    //given
    const invalidUserId = 999;
    const mockDeleteUser = jest.fn().mockResolvedValue(false);
    userDb.deleteUser = mockDeleteUser;

    //when
    const result = await userDb.deleteUser(invalidUserId);

    //then
    expect(mockDeleteUser).toHaveBeenCalledTimes(1);
    expect(mockDeleteUser).toHaveBeenCalledWith(invalidUserId);
    expect(result).toBe(false);
});
