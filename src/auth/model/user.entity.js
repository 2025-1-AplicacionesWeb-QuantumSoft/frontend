export class User {
    constructor({
        id='',
        name = '',
        password = '',
        phone='',
        role = '',
        created_at = new Date(),
        updated_at = new Date()
                }) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.role = role;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
