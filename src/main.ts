import {
  ConsoleService,
  HttpsService,
  LinuxFilesService,
  ResultsService,
  SpinnerService,
  StreamService,
  UpdateService,
  WindowsFilesService,
} from './services/index.js';

import { Controller } from './controller.js';
import { IFileService } from './interfaces/file-service.interface.js';
import { MacFilesService } from './services/mac-files.service.js';

const getOS = () => process.platform;

const OSService = {
  linux: LinuxFilesService,
  win32: WindowsFilesService,
  darwin: MacFilesService,
};

const streamService: StreamService = new StreamService();

const fileService: IFileService = new OSService[getOS()](streamService);

export const controller = new Controller(
  fileService,
  new SpinnerService(),
  new ConsoleService(),
  new UpdateService(new HttpsService()),
  new ResultsService(),
);
