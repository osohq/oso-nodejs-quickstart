allow(actor, action, resource) if
    role_allow(actor, action, resource);
allow(_, _, _);
actor_role(actor, role) if
    role in actor.getRoles();

resource(_type: Page, "page", actions, roles) if
    actions = ["read", "write"] and
    roles = {
        user: {
            permissions: ["read"]
        },
        admin: {
            permissions: ["write"],
            implies: ["user"]
        }
    };
