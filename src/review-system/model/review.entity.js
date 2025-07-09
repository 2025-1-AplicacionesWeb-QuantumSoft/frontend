export class Review{
    constructor({
                    Id = 0,
                    rating = 0,
                    comment = '',
                    date = new Date(),
                    ParentId = 0,
                    BabysitterId = 0,
                })
    {
        this.Id = Id;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
        this.ParentId = ParentId;
        this.BabysitterId = BabysitterId;
    }
}