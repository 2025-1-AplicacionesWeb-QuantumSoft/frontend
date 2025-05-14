export class UserEntity {
    constructor( {
        id = "",
        name= "",
        email = "",
        password = "",
        phone = "",
        role = "",
        created_at = "",
        updated_at = "",
                 })
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}