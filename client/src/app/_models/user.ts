export class User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;

    // passport salt/hash
    salt?: string;
    hash?: string;
}