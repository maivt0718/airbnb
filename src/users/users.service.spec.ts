import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { users_gender } from '@prisma/client';

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        {
          id: 1,
          gender: users_gender.MALE,
          username: 'Thần bí',
          email: 'tt@gmail.com',
          pass_word: 'password123',
          phone: '0988302483',
          birthday: '1990-09-09',
          role: 'user',
        },
        {
          id: 4,
          gender: users_gender.MALE,
          username: 'bob_martin',
          email: 'bob@example.com',
          pass_word: 'password123',
          phone: '1234567893',
          birthday: '1988-03-14',
          role: 'user',
        },
      ];

      jest.spyOn(prismaService.users, 'findMany').mockResolvedValue(mockUsers);

      const result = await usersService.getAllUsers();

      expect(result).toEqual(mockUsers);
    });

    it('should throw NotFoundException if no users are found', async () => {
      jest.spyOn(prismaService.users, 'findMany').mockResolvedValue(null);

      await expect(usersService.getAllUsers()).rejects.toThrow(Error);
    });

    it('should throw an error if an exception occurs', async () => {
      jest
        .spyOn(prismaService.users, 'findMany')
        .mockRejectedValue(new Error('Database error'));

      await expect(usersService.getAllUsers()).rejects.toThrow(Error);
    });
  });
});
