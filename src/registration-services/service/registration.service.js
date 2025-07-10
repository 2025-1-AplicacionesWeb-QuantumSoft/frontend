import httpInstance from '@/shared/services/http.instance.js';
import {BabysitterAssembler, ParentAssembler} from "@/registration-services/service/registration.assembler.js";
// const API_BASE = 'http://localhost:3000';


export class BabysitterService {
    static async getBabysitters() {
        const response = await httpInstance.get(`babysitter`)
        console.log("Babysitters", response)
        return BabysitterAssembler.toEntitiesFromResponse(response)
    }
    static async getBabysitterByUserId (userId) {
        const response = await httpInstance.get(`babysitter/user/${userId}`)
        console.log("Babysitter", response)
        return BabysitterAssembler.toEntityFromResponse(response.data)
    }

    static async createBabysitter(babysitter) {
        const response = await httpInstance.post(`babysitter`, babysitter)
        console.log("Create Babysitter", response)
        return BabysitterAssembler.toEntityFromResponse(response)
    }
    static async UpdateBabysitter(babysitter) {
        const response = await httpInstance.patch(`babysitter/${babysitter.id}`, babysitter)
        console.log("Update Babysitter", response)
        return BabysitterAssembler.toEntityFromResponse(response)

    }
}


export class ParentService {
    static async getParents() {
        const response = await httpInstance.get(`parent`)
        console.log("Parents", response)
        return ParentAssembler.toEntitiesFromResponse(response)
    }
    static async getParentByUserId(userId) {
        const response = await httpInstance.get(`parent/user/${userId}`)
        console.log("Parent", response)
        return ParentAssembler.toEntityFromResponse(response.data)
    }

    static async createParent(parent) {
        const response = await httpInstance.post(`parent`, parent)
        console.log("Create Parent", response)
        return ParentAssembler.toEntityFromResponse(response)
    }
    static async UpdateParent(parent) {
        const response = await httpInstance.patch(`parent/${parent.id}`, parent)
        console.log("Update Parent", response)
        return ParentAssembler.toEntityFromResponse(response)
    }
}