const linking = {
    prefixes: ['interns://', 'https://interns.pandosima.com'],
    config: {
        screens: {
            Dashboard: 'dashboard',
            HumanResources: {
            path: 'hr',
            screens: {
                Roles: {
                    initialRouteName: 'Roles',
                    screens: {
                        'Roles': 'roles',
                        'Role': {
                            path: 'roles/:id/:editing',
                            parse: {
                                editing: (editing: string) =>
                                editing.toLowerCase() === 'true',
                            },
                        },
                    },
                },
                Employees: {
                    initialRouteName: 'Employees',
                    screens: {
                        Employees: 'employees',
                        Employee: {
                            path: 'employees/:id/:editing',
                            parse: {
                                editing: (editing: string) =>
                                editing.toLowerCase() === 'true',
                            },
                        },
                    },
                },
                TimekeeperDeviceManagement: {
                    initialRouteName: 'TimekeeperDevices',
                    screens: {
                        TimekeeperDevices: 'timekeeper-devices',
                        TimekeeperDevice: {
                        path: 'timekeeper-devices/:id/:editing',
                            parse: {
                                editing: (editing: string) =>
                                editing.toLowerCase() === 'true',
                            },
                        },
                    },
                },
            },
            },
        },
    },
};

export default linking;