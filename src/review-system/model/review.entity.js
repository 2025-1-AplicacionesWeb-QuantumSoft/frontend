export class Review{
    constructor({
                    id = '',
                    rating = 0,
                    comment = '',
                    date = new Date(),
                    parentId = '',
                    babysitterId = '',
                })
    {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
        this.parentId = parentId;
        this.babysitterId = babysitterId;
    }
}