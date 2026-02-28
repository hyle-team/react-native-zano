"use strict";

import { createErrorClass } from "../errors.js";
export class ZanoControllerAlreadyInitiated extends createErrorClass('ZanoControllerAlreadyInitiated', 'Trying to initiate zano controller second time') {}
export class ZanoControllerFailedToInitialize extends createErrorClass('ZanoControllerFailedToInitialize', 'Failed to initialize zano library') {}
export class ZanoControllerInvalidDaemonURL extends createErrorClass('ZanoControllerInvalidDaemonURL', 'Invalid daemon url passed') {}
//# sourceMappingURL=errors.js.map