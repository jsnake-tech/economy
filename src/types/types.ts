export interface Time {
    time: number;
    date: string;
    user?: {
        id: User['id'];
        name: User['name'];
    };
    project?: {
       id: Project['id']; 
       name: Project['name'];
       workspace: string;
    };
    task?: {
        id: Time[];
        name: string;
        status: string;
        type: string;
        iteration: string;
        number: number;
        dueAt: string;
    }
}

enum UserRole {
    'admin',
    'supervisor',
    'member'
}

enum UserStatus {
    'active',
    'invited',
    'pending',
    'removed'
}

export interface User {
    id: number;
    name: string;
    headline: string;
    avatarUrl: string;
    role: UserRole;
    status: UserStatus;
    cost: number;
    rate: number;
}

enum ProjectType {
    'board',
    'list'
}

enum ProjectBillingType {
    'non_billable',
    'hourly',
    'fixed_fee'
}

interface MoneyOverrides {
    [index: number]: number;
}

enum BudgetType {
    'money',
    'time'
}

enum BudgetPeriod {
    'general',
    'monthly',
    'weekly',
    'daily'
}

enum RateType {
    ProjectRate = 'project_rate',
    UserRate = 'user_rate',
    UserCost = 'user_cost',
    NonBillable = 'non_billable'
}

export interface Project {
    id: string;
    name: string;
    workspaceId?: string;
    workspaceName?: string;
    client?: number;
    type?: ProjectType;
    favorite?: boolean;
    users?: number[];
    billing?: {
        type: ProjectBillingType
    };
    fee?: number;
    rate?: {
        type: RateType;
        rate?: number;
        userRateOverrides?: MoneyOverrides;
        userCostOverrides?: MoneyOverrides;
    };
    budget: {
        type: BudgetType;
        budget: number;
        progress?: number;
        timeProgress?: number;
        expenseProgress?: number;
        period: BudgetPeriod;
        appliedFrom?: string;
        disallowOverbudget?: boolean;
        excludeUnbillableTime?: boolean;
        excludeExpenses?: boolean;
        showToUsers?: boolean;
        threshold?: number
    }
}

export type EverhourData = {
    users: User[];
    time: Time[];
    projects: Project[];
}

export interface FormattedDataForDatabase {
    member: string;
    task: string;
    billable_amount: number;
    cost: number;
    profit: number;
    negative_estimation?: number;
    positive_estimation?: number;
    task_id: string;
    date: string;
    time: number;
    project_id: string;
    project_name: string;
    member_id: string;
}