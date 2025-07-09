export class Babysitter {
    constructor( {
       id = 0,
       user_id = 0,
        name= "",
        phone = "",
       description = "",
       languages = "",
       rating = 0,
       location = "",
       accountBank = "",
       bankName = "",
       typeAccountBank = "",
       dni = "",
       experienceLevel = ""
    })
    {
        this.id = id;
        this.user_id = user_id;
        this.name = name;
        this.phone = phone;
        this.description = description;
        this.experienceLevel = experienceLevel;
        this.languages = languages;
        this.rating = rating;
        this.location = location;
        this.accountBank = accountBank;
        this.bankName = bankName;
        this.typeAccountBank = typeAccountBank;
        this.dni = dni;
    }
}