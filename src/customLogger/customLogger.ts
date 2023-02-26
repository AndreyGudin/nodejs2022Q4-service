import { ConsoleLogger } from '@nestjs/common/services';
import { appendFile, mkdir, stat, readdir } from 'node:fs/promises';
import { join } from 'node:path';

export class MyLogger extends ConsoleLogger {
  /**
   * Write a 'log' level log.
   */
  currentDate = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });

  getFolder() {
    const end = __dirname.indexOf('dist');
    const folder = __dirname.substring(0, end + 4);
    return folder;
  }

  async writeToFile(name: string, data: string, type: string) {
    const file = (suffix = 1) =>
      join(this.getFolder(), 'logs', `${name}_${suffix}.txt`);
    const pathToFolder = join(this.getFolder(), 'logs');
    await mkdir(pathToFolder, {
      recursive: true,
    });
    const amount = (await readdir(pathToFolder)).length;
    try {
      const { size } = await stat(file(amount));
      const sizeInKB = size / 1024;
      if (sizeInKB > 2) {
        await appendFile(
          file(amount + 1),
          `${this.currentDate.format(new Date())} ${type}: ${data} \n`,
        );
      } else {
        await appendFile(
          file(amount),
          `${this.currentDate.format(new Date())} ${type}: ${data} \n`,
        );
      }
    } catch (error) {
      await appendFile(
        file(),
        `${this.currentDate.format(new Date())} ${type}: ${data} \n`,
      );
    }
  }

  async log(message: string) {
    await this.writeToFile('log', message, 'Log');
    super.log(message);
  }

  /**
   * Write an 'error' level log.
   */
  async error(message: string) {
    await this.writeToFile('error', message, 'Error');
    super.error(message);
  }

  /**
   * Write a 'warn' level log.
   */
  async warn(message: string) {
    await this.writeToFile('log', message, 'Warning');
    super.warn(message);
  }
}
