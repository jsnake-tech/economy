"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRole;
(function (UserRole) {
    UserRole[UserRole["admin"] = 0] = "admin";
    UserRole[UserRole["supervisor"] = 1] = "supervisor";
    UserRole[UserRole["member"] = 2] = "member";
})(UserRole || (UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["active"] = 0] = "active";
    UserStatus[UserStatus["invited"] = 1] = "invited";
    UserStatus[UserStatus["pending"] = 2] = "pending";
    UserStatus[UserStatus["removed"] = 3] = "removed";
})(UserStatus || (UserStatus = {}));
var ProjectType;
(function (ProjectType) {
    ProjectType[ProjectType["board"] = 0] = "board";
    ProjectType[ProjectType["list"] = 1] = "list";
})(ProjectType || (ProjectType = {}));
var ProjectBillingType;
(function (ProjectBillingType) {
    ProjectBillingType[ProjectBillingType["non_billable"] = 0] = "non_billable";
    ProjectBillingType[ProjectBillingType["hourly"] = 1] = "hourly";
    ProjectBillingType[ProjectBillingType["fixed_fee"] = 2] = "fixed_fee";
})(ProjectBillingType || (ProjectBillingType = {}));
var BudgetType;
(function (BudgetType) {
    BudgetType[BudgetType["money"] = 0] = "money";
    BudgetType[BudgetType["time"] = 1] = "time";
})(BudgetType || (BudgetType = {}));
var BudgetPeriod;
(function (BudgetPeriod) {
    BudgetPeriod[BudgetPeriod["general"] = 0] = "general";
    BudgetPeriod[BudgetPeriod["monthly"] = 1] = "monthly";
    BudgetPeriod[BudgetPeriod["weekly"] = 2] = "weekly";
    BudgetPeriod[BudgetPeriod["daily"] = 3] = "daily";
})(BudgetPeriod || (BudgetPeriod = {}));
//# sourceMappingURL=types.js.map