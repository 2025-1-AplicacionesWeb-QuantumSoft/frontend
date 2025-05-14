export class ReservationEntity {
    constructor( {
        id = "",
        start_time = "",
        end_time = "",
        status = "",
        notification = "",
        parent_id = 0,
        babysitter_id = 0,
                 })
    {
        this.id = id;
        this.start_time = start_time;
        this.end_time = end_time;
        this.status = status;
        this.notification = notification;
        this.parent_id = parent_id;
        this.babysitter_id = babysitter_id;

    }
}