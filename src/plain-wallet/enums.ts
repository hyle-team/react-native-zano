export enum ZanoLogLevel {
  SILENT = -1,
  DISABLED = 0,
  MINIMAL = 1,
  AVERAGE = 2,
  DETAILED = 3,
  VERBOSE = 4,
}

export enum ZanoPriority {
  default = 0,
  unimportant = 1,
  normal = 2,
  elevated = 3,
  urgent = 4,
}

export enum GENERAL_INTERNAL_ERROR {
  INSTANCE = 'GENERAL_INTERNAL_ERROR: WALLET INSTNACE NOT FOUND',
  INIT = 'Failed to intialize library',
}
