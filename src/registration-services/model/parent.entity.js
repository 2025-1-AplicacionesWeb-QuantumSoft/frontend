export class Parent {
    constructor( {
        id = 0,
        userId = 0,
        address = "",
        name = "",
        phone = "",
        childrenCount = 0,
        preferences = "",
        city = ""
                 })
    {
        this.id = id;
        this.userId = userId;
        this.address = address;
        this.name = name;
        this.phone = phone;
        this.childrenCount = childrenCount;
        this.preferences = preferences;
        this.city = city;
    }
}
