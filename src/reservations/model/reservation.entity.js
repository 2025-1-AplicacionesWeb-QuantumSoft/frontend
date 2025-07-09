export class ReservationEntity {
    constructor( {
        id = "",
        startTime = "",
        endTime = "",
        status = "",
        notificationId = 0,
        parentId = 0,
        babysitterId = 0,
        address = "",
        frequency = "",
        childName = "",
        childAge = 0,
        specialNeeds = "",
        additionalInfo = "",
        createdAt = "",

                 })
    {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.notificationId = notificationId;
        this.parentId = parentId;
        this.babysitterId = babysitterId;
        this.address = address;
        this.frequency = frequency;
        this.childName = childName;
        this.childAge = childAge;
        this.specialNeeds = specialNeeds;
        this.additionalInfo = additionalInfo;
        this.createdAt = createdAt;
    }
}