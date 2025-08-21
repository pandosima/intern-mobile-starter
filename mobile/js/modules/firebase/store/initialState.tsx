export type UserToken = {
    id: string;
    user : {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        active: boolean;
    };
    token: string;
}

export default {
    userToken : {
        id: '',
        user : {
            id: '',
            email: '',
            first_name: '',
            last_name: '',
            active: false,
        },
        token: '',
    },
    uploadingUserToken: false,
    removingUserToken: false,
}