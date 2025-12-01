import { createErrorClass } from '../errors';

export class ZanoControllerAlreadyInitiated extends createErrorClass(
  'ZanoControllerAlreadyInitiated',
  'Trying to initiate zano controller second time'
) {}
export class ZanoControllerFailedToInitialize extends createErrorClass('ZanoControllerFailedToInitialize', 'Failed to initialize zano library') {}
export class ZanoControllerInvalidDaemonURL extends createErrorClass('ZanoControllerInvalidDaemonURL', 'Invalid daemon url passed') {}
