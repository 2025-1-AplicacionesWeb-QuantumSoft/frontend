export class Parent {
    constructor( {
        userId = 0,
        address = "",
        name = "",
        phone = "",
        childrenCount = 0,
        preferences = "",
        city = ""
                 })
    {
        this.userId = userId;
        this.address = address;
        this.name = name;
        this.phone = phone;
        this.childrenCount = childrenCount;
        this.preferences = preferences;
        this.city = city;
    }
}
