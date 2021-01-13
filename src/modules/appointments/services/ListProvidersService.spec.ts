import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able list providers', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'John Uno',
      email: 'johnuno@example.com',
      password: '123456',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const userThree = await fakeUsersRepository.create({
      name: 'John Tres',
      email: 'johntres@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Catorce',
      email: 'johntres@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([userOne, userTwo, userThree]);
  });

  // it('should not be able to show the profile of a non-existing user', async () => {
  //   await expect(
  //     showProfile.execute({
  //       user_id: 'non-existing-user-id',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
