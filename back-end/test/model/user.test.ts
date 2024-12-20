import { User } from '../../model/user';

const user = new User({
    id: 1,
    username: 'test',
    password: 'test123',
    email: 'test@gmail.com',
    role: 'user',
});

test('given: valid values for user, when: user is created, then: user is created', () => {
    //given

    //when
    const user = new User({
        id: 1,
        username: 'test',
        password: 'test123',
        email: 'test@gmail.com',
        role: 'user',
    });

    //then
    expect(user.getId()).toBe(1);
    expect(user.getUsername()).toBe('test');
    expect(user.getPassword()).toBe('test123');
    expect(user.getEmail()).toBe('test@gmail.com');
});

test('given: invalid username, when: user is created, then: throw error', () => {
    //given

    //when
    const user = () =>
        new User({ username: 'te', password: 'test123', email: 'test@gmail.com', role: 'user' });

    //then
    expect(user).toThrow('Username must be at least 3 characters long');
});

test('given: invalid password, when: user is created, then: throw error', () => {
    //given

    //when
    const user = () =>
        new User({ id: 1, username: 'test', password: '', email: 'test@gmail.com', role: 'user' });

    //then
    expect(user).toThrow('Password is required');
});
