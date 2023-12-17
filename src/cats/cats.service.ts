import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Omit<Cat, 'id'>) {
    const id = Date.now().toString();
    this.cats.push({ id, ...cat });
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findById(id: string): Cat {
    return this.cats.find((cat) => cat.id === id);
  }
}
