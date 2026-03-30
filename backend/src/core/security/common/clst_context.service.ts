// src/common/clst_context.service.ts
import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class ClsContextService {
  private static readonly storage = new AsyncLocalStorage<Map<string, any>>();

  static run(userName: string, callback: () => void) {
    const store = new Map();
    store.set('userName', userName);
    this.storage.run(store, callback);
  }

  static getUserName(): string | undefined {
    return this.storage.getStore()?.get('userName');
  }
}
