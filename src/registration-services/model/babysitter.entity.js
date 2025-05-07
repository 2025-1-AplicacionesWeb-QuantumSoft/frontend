export class Babysitter {
    constructor(id, user_id, name, email, phone, location, experience, description, rating) {
        this.id = id;                   // babysitter.id
        this.user_id = user_id;         // babysitter.user_id
        this.name = name;               // user.name
        this.email = email;             // user.email
        this.phone = phone;             // user.phone
        this.location = location;       // babysitter.location
        this.experience = experience;   // babysitter.experience
        this.description = description; // babysitter.description (biografía)
        this.rating = rating;           // babysitter.rating
    }
}
