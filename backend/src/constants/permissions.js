const PERMISSIONS = {
    ADMIN: ["department:create",
"department:read",
"department:update",
"department:delete",
"category:create",
"category:read",
"category:update",
"category:delete",
"user:read",
"user:update",
"asset:create",
"asset:read",
"asset:update",
"asset:delete",
"asset:allocate",
"asset:transfer",
"booking:create",
"booking:read",
],

    ASSET_MANAGER: [
        "dashboard:read",

        "department:read",

        "category:create",
        "category:read",
        "category:update",

        "asset:create",
        "asset:read",
        "asset:update",
        "asset:allocate",
        "asset:transfer",

        "booking:read",

        "maintenance:approve",
        "maintenance:update",

        "audit:read",

        "notification:read",
        "booking:read",
    ],

    DEPARTMENT_HEAD: [
        "dashboard:read",

        "department:read",

        "asset:read",
        "asset:allocate",

        "booking:create",
        "booking:approve",

        "transfer:approve",

        "maintenance:read",

        "notification:read"
    ],

    EMPLOYEE: [
        "dashboard:read",

        "asset:read",

        "booking:create",
        "booking:update",
        "booking:cancel",

        "maintenance:create",

        "notification:read",

        "profile:update",
        "booking:create",
    ]
};

module.exports = PERMISSIONS;