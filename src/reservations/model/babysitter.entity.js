export class Babysitter {
    constructor(id,user_id, description, experience, languages, rating, verified, location, accountBank, bankName, typeAccountBank, dni) {
        this.id = id;
        this.user_id = user_id;
        this.description = description;
        this.experience = experience;
        this.languages = languages;
        this.rating = rating;
        this.verified = verified;
        this.location = location;
        this.accountBank = accountBank;
        this.bankName = bankName;
        this.typeAccountBank = typeAccountBank;
        this.dni = dni;
    }
}