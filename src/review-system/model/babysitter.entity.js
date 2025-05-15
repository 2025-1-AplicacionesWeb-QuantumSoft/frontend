export class Babysitter {
    constructor({
                    id = '',
            userId = '',
            description = '',
            experience = '',
            rating = 0,
            verified = false,
            location = '',
        })
    {
        this.id = id;
        this.userId = userId;
        this.description = description;
        this.experience = experience;
        this.rating = rating;
        this.verified = verified;
        this.location = location;
    }
}