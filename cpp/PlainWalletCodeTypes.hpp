#define StringReturn std::string
#define StringReturnCast(expression) expression
#define StringParam const std::string &
#define StringParamCast(expression) expression

#define BoolReturn bool
#define BoolReturnCast(expression) expression

#define IntReturn double
#define IntReturnCast(expression) expression

#define DoubleParam double
#define DoubleParamCast(expression) expression

#define SizeParam double
#define SizeParamCast(expression) expression

#define HWalletParam double
#define HWalletParamCast(expression) static_cast<plain_wallet::hwallet>(expression)

#define ZanoLogLevelParam ZanoLogLevel
#define ZanoLogLevelParamCast(expression) static_cast<int>(expression)

#define ZanoPriorityParam ZanoPriority
#define ZanoPriorityParamCast(expression) static_cast<int>(expression)
