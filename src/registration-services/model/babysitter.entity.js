export class Babysitter {
    constructor({
                    id = '',
                    user_id = '',
                    description = '',
                    experience = '',
                    languages = null,
                    rating = null,
                    verified = false,
                    location = '',
                    accountBank = '',
                    bankName = '',
                    typeAccountBank = '',
                    dni = ''
                }) {
        this.id = id;                   // babysitter.id
        this.user_id = user_id;         // babysitter.user_id
        this.description = description; // babysitter.description
        this.experience = experience;   // babysitter.experience
        this.languages = languages;     // babysitter.languages
        this.rating = rating;           // babysitter.rating
        this.verified = verified;       // babysitter.verified
        this.location = location;       // babysitter.location
        this.accountBank = accountBank; // babysitter.accountBank
        this.bankName = bankName;       // babysitter.bankName
        this.typeAccountBank = typeAccountBank; // babysitter.typeAccountBank
        this.dni = dni;                 // babysitter.dni
    }
}