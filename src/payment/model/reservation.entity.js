export class Reservation {
    constructor({
        id="",
        start_time="",
        status="",
        created_at="",
        notifications_id=null,
        parent_id=null,
        babysitter_id=null,
                }) {
        this.id=id;
        this.start_time=start_time;
        this.status=status;
        this.created_at=created_at;
        this.notifications_id=notifications_id;
        this.parent_id=parent_id;
        this.parent_id=parent_id;
        this.babysitter_id=babysitter_id;
    }
}