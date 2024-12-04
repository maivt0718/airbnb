import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { CloudUploadService } from '../shared/cloudinaryUpload.service';
import { cloudinaryProvider } from '../cloudinary/cloudinary.provider';
import { HttpStatus } from '@nestjs/common';
import { users_gender } from '@prisma/client';
import { usersDto } from './dto/users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let mockUserService: jest.Mocked<UsersService>;
  const responseMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const mockUsers = {
    id: 6,
    gender: users_gender.FEMALE,
    username: 'diana_wilson',
    email: 'diana@example.com',
    pass_word: 'password123',
    phone: '1234567895',
    birthday: '1993-11-09',
    role: 'user',
  };

  const mockUsersArray = [mockUsers];
  mockUserService = {
    getAllUsers: jest.fn().mockResolvedValue(mockUsersArray),
    postUsers: jest.fn(),
    searchPagination: jest.fn().mockResolvedValue(mockUsersArray),
    getUser: jest.fn().mockResolvedValue(mockUsers),
    updateUser: jest.fn(),
    searchUserName: jest.fn().mockResolvedValue(mockUsersArray),

    // còn những chức năng khác create, put, delete ...
  } as unknown as jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        PrismaService,
        CloudUploadService,
        cloudinaryProvider,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return all users and a status of 200', async () => {
      await controller.getAllUsers(responseMock);
      expect(service.getAllUsers).toHaveBeenCalled();
      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: mockUsersArray,
      });
    });

    it('should handle errors appropriately', async () => {
      const errorMessage = 'Internal Server Error';
      jest
        .spyOn(service, 'getAllUsers')
        .mockRejectedValue(new Error(errorMessage));

      await controller.getAllUsers(responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(responseMock.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Tạo thông tin người dùng mới
      const newUser = {
        id: 100,
        gender: users_gender.MALE,
        username: 'oliver_wilson',
        email: 'oliver@example.com',
        pass_word: 'password123',
        phone: '1234567895',
        birthday: '1993-11-09',
        role: 'user',
      };

      // Mock kết quả trả về của phương thức create
      mockUserService.postUsers.mockResolvedValue(newUser);

      // Gọi phương thức create của controller với newUser như CreateUserDto
      await controller.create(newUser as CreateUserDto, responseMock);

      // Kiểm tra xem phương thức create đã được gọi với newUser như mong đợi
      expect(mockUserService.postUsers).toHaveBeenCalledWith(
        expect.objectContaining(newUser),
      );

      // Kiểm tra xem trạng thái của response đã được set là HttpStatus.CREATED
      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.CREATED);

      // Kiểm tra xem JSON của response đã được gọi với đối tượng newUser
      expect(responseMock.json).toHaveBeenCalledWith({
        message: newUser,
      });
    });
  });

  describe('searchPaginationUser', () => {
    it('should return paginated users and a status of 200', async () => {
      // Tạo thông tin phân trang
      const page = 1;
      const size = 10;
      const keyword = 'oliver';
      // Mock kết quả trả về của phương thức searchPagination
      mockUserService.searchPagination.mockResolvedValue(mockUsersArray);
      // Gọi phương thức searchPagination của controller với thông tin phân trang
      await controller.searchPaginationUser(page, size, keyword, responseMock);
      // Kiểm tra xem phương thức searchPagination đã được gọi với thông tin phân trang như mong đ��i
      expect(mockUserService.searchPagination).toHaveBeenCalledWith(
        page,
        size,
        keyword,
      );
      // Kiểm tra xem trạng thái của response đã được set là HttpStatus.OK
      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.OK);
      // Kiểm tra xem JSON của response đã được gọi với đối tượng mockUsersArray
      expect(responseMock.json).toHaveBeenCalledWith({
        message: mockUsersArray,
      });
    });
    describe('searchPaginationUser', () => {
      it('should return internal server error response on error', async () => {
        const mockError = new Error('Internal server error');

        // Mock usersService.searchPagination to throw an error
        jest.spyOn(service, 'searchPagination').mockImplementation(() => {
          throw mockError;
        });

        // Call the method with dummy values
        await controller.searchPaginationUser(1, 10, 'keyword', responseMock);

        // Expect the response to have been called with internal server error message
        expect(responseMock.status).toHaveBeenCalledWith(
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        expect(responseMock.json).toHaveBeenCalledWith({
          message: mockError.message,
        });
      });
    });
  });
  //

  describe('getUser', () => {
    it('should return get a user by id', async () => {
      const mockUserId = '6';
      // const mockUsersDto: usersDto = {
      //   id: 1,
      //   name: 'Alice',
      //   password: 'password123',
      //   gender: 'FEMALE',
      //   email: 'alice@example.com',
      //   phone: '1234567890',
      //   birthday: '1990-05-15',
      //   role: 'user',
      // }; tạo dữ liệu này nếu dữ liệu key không trùng khớp với usersDto

      // Mock usersService.getUser để trả về người dùng giả định
      jest.spyOn(service, 'getUser').mockResolvedValue(mockUsers);

      // Gọi phương thức với id giả định và response mock
      await controller.findOneUser(mockUserId, responseMock);

      // Kiểm tra xem phản hồi đã được gọi với người dùng đúng không
      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(responseMock.json).toHaveBeenCalledWith({ user: mockUsers });
    });
    it('should handle errors appropriately', async () => {
      const mockUserId = '1';
      const errorMessage = 'Internal server error';
      // Mock the getUser method to throw an error
      jest.spyOn(service, 'getUser').mockRejectedValue(new Error(errorMessage));

      // Call the method with the mockUserId and response mock
      await controller.findOneUser(mockUserId, responseMock);

      // Check if the response was called with the appropriate error message
      expect(responseMock.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(responseMock.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
  //

  describe('updateUser', () => {
    it('should update a user by id', async () => {
      const newUpdateUser = {
        id: 1,
        pass_word: 'password123',
        username: 'UpdatedUsername',
        gender: users_gender.FEMALE,
        email: 'updated@example.com',
        phone: '9876543210',
        birthday: '1995-10-20',
        role: 'admin',
      };
      // Mock kết quả trả về của phương thức create
      mockUserService.updateUser.mockResolvedValue(newUpdateUser);

      // Gọi phương thức create của controller với newUpdateUser như CreateUserDto
      await controller.update(
        String(newUpdateUser.id),
        newUpdateUser as UpdateUserDto,
        responseMock,
      );

      // Kiểm tra xem phương thức create đã được gọi với newUpdateUser như mong đợi
      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        newUpdateUser.id,
        expect.objectContaining(newUpdateUser),
      );

      // Kiểm tra xem phản hồi đã được gọi với người dùng đúng không
      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: newUpdateUser,
      });
    });
  });

  it('should return user when found', async () => {
    const mockUsername = 'diana_wilson';
    mockUserService.searchUserName.mockResolvedValue(mockUsersArray);

    await controller.searchUser(mockUsername, responseMock);

    expect(mockUserService.searchUserName).toHaveBeenCalledWith(mockUsername);
    expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(responseMock.json).toHaveBeenCalledWith(mockUsersArray);
  });
});

// @Get('/getAllUsers') //done
// @Post('/createUser') //done
// @Delete('deleteUser/:id') 
// @Get('/searchPagination') done
// @Get('getUser/:id') done
// @Put('/updateUser/:id') done
// @Get('/searchUser') done
// @Post('/upload-user-cloud')
