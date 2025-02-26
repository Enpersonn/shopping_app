export enum Permissions {
	VIEW_REPORTS = "view_reports",
	MANAGE_USERS = "manage_users",
	MANAGE_PRODUCTS = "manage_products",
	MANAGE_ORDERS = "manage_orders",
	MAKE_PURCHASES = "make_purchases",
	EDIT_WEBSITE_CONTENT = "edit_website_content",
}

export enum Roles {
	ADMIN = "admin",
	CUSTOMER = "customer",
	GUEST = "guest",
	EDITOR = "editor",
}

export type SessionData = {
	user: User | null;
};

export type User = {
	name?: string;
	id?: string;
	email?: string;
	role?: string;
	permissions?: string[];
	lastLogin?: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	additionalInfo?: any;
};
export type SessionFlashData = {
	error: string;
};
