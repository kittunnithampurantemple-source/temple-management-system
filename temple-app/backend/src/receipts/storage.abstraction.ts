import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Storage abstraction layer.
 * Today: writes to local disk (./uploads).
 * Tomorrow: swap LOCAL driver for a SupabaseStorageDriver implementing the
 * same interface (save/getUrl/delete) - nothing in the rest of the app
 * needs to change, since callers only depend on StorageService.
 */
export interface StorageDriver {
  save(key: string, buffer: Buffer): Promise<string>; // returns a retrievable path/URL
  getAbsolutePath(key: string): string;
}

class LocalStorageDriver implements StorageDriver {
  private basePath = process.env.LOCAL_STORAGE_PATH || './uploads';

  async save(key: string, buffer: Buffer): Promise<string> {
    const fullPath = path.join(this.basePath, key);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, buffer);
    return key;
  }

  getAbsolutePath(key: string): string {
    return path.join(this.basePath, key);
  }
}

// class SupabaseStorageDriver implements StorageDriver { ... } // future

@Injectable()
export class StorageService implements StorageDriver {
  private driver: StorageDriver;

  constructor() {
    // STORAGE_DRIVER env toggles the implementation - only this constructor
    // needs to change when Supabase storage is introduced.
    this.driver = new LocalStorageDriver();
  }

  save(key: string, buffer: Buffer) { return this.driver.save(key, buffer); }
  getAbsolutePath(key: string) { return this.driver.getAbsolutePath(key); }
}
