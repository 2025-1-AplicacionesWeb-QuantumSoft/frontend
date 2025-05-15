export class Review{
    constructor({
                    id = '',
                    parentId = '',
                    babysitterId = '',
                    comment = '',
                    rating = 0,
                    date = new Date(),
                })
    {
        this.id = id;
        this.parentId = parentId;
        this.babysitterId = babysitterId;
        this.comment = comment;
        this.rating = rating;
        this.date = date;
    }
}