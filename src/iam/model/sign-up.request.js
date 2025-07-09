/**
 * Sign up request model
 * @summary
 * Represents a sign-up request. This is used to register a user.
 */
export class SignUpRequest {
    /**
     * Constructor
     * @param {string} username The username of the user.
     * @param {string} password The password of the user.
     * @param {string} role The role of the user (optional).
     */
    constructor(username, password, role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}