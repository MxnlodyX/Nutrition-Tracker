// src/models/UserInformation.ts
class UserInformation {
    firstname = "";
    lastname = "";
    gender = "";
    birthday = "";
    email = "";
    password = "";
    weight = "";
    height = "";
    activity = "";

    constructor(data?: Partial<UserInformation>) {
        Object.assign(this, data);
    }
}

export default UserInformation;
