import { ConsoleLogger } from '@nestjs/common/services';
import { appendFile, mkdir, stat, readdir } from 'node:fs/promises';
import { join } from 'node:path';

export class CustomLogger extends ConsoleLogger {
  currentDate = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });
  fileSize = +process.env.LOG_FILE_SIZE;
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
    const amount = (await readdir(pathToFolder)).filter(
      (a) => a.split('_')[0] === name,
    ).length;

    try {
      const { size } = await stat(file(amount));
      const sizeInKB = size / 1024;
      if (sizeInKB > this.fileSize) {
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

  async error(message: string, stack?: string, context?: string) {
    await this.writeToFile('error', stack, 'Error');
    super.error(message);
  }

  async warn(message: string) {
    await this.writeToFile('log', message, 'Warning');
    super.warn(message);
  }
}
