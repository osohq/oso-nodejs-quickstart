allow(actor, action, resource) if
    role_allows(actor, action, resource);

actor_has_role_for_resource(actor, role, resource) if
    {name: role, resource: resource} in actor.getRoles();

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
