export class User {

    user_id: number = 0;
    email: string = "";
    username: string = "";
    password: string = "";
    first_name: string = "";
    last_name: string = "";
    address: string = "";
    userType: string = "";
    contact: string = "";
    imageUrl: string = "";
    userRemoved: boolean = false;
    // add after current user problems solved
    // userSettings: UserSettings = null;
}

export class UserSettings {
    user_settings_id: number = 0;
    user_id: number = 0;
    css_mode: string = "";
    email_notifications: boolean = true;
}