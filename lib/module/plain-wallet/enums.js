"use strict";

export let ZanoLogLevel = /*#__PURE__*/function (ZanoLogLevel) {
  ZanoLogLevel[ZanoLogLevel["SILENT"] = -1] = "SILENT";
  ZanoLogLevel[ZanoLogLevel["DISABLED"] = 0] = "DISABLED";
  ZanoLogLevel[ZanoLogLevel["MINIMAL"] = 1] = "MINIMAL";
  ZanoLogLevel[ZanoLogLevel["AVERAGE"] = 2] = "AVERAGE";
  ZanoLogLevel[ZanoLogLevel["DETAILED"] = 3] = "DETAILED";
  ZanoLogLevel[ZanoLogLevel["VERBOSE"] = 4] = "VERBOSE";
  return ZanoLogLevel;
}({});
export let ZanoPriority = /*#__PURE__*/function (ZanoPriority) {
  ZanoPriority[ZanoPriority["default"] = 0] = "default";
  ZanoPriority[ZanoPriority["unimportant"] = 1] = "unimportant";
  ZanoPriority[ZanoPriority["normal"] = 2] = "normal";
  ZanoPriority[ZanoPriority["elevated"] = 3] = "elevated";
  ZanoPriority[ZanoPriority["urgent"] = 4] = "urgent";
  return ZanoPriority;
}({});
export let GENERAL_INTERNAL_ERROR = /*#__PURE__*/function (GENERAL_INTERNAL_ERROR) {
  GENERAL_INTERNAL_ERROR["INSTANCE"] = "GENERAL_INTERNAL_ERROR: WALLET INSTNACE NOT FOUND";
  GENERAL_INTERNAL_ERROR["INIT"] = "Failed to intialize library";
  return GENERAL_INTERNAL_ERROR;
}({});
//# sourceMappingURL=enums.js.map