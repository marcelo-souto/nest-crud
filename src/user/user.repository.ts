import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserRepository {
  users: User[] = [
    {
      id: '1',
      name: 'Marcelo Souto',
      email: 'marcelo@email.com',
      password: '123456',
      roles: [2],
    },
  ];

  create(user: Omit<User, 'id'>) {
    this.users.push({
      ...user,
      id: Date.now().toString(),
    });
  }

  getAll() {
    return this.users;
  }

  getById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  getByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  update(id: string, newUserInformation: Partial<User>) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...newUserInformation,
    };

    return this.users[userIndex];
  }

  delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
