import { ticketsModel } from "./models/purchaseTicket.js";


export class TicketsDAO{
    constructor(){}
    async getTicket(id){
        try {
            let ticket = await ticketsModel.findOne(id)
            return ticket
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    async createTicket(content){
        try {
            let newTicket = ticketsModel.create(content)
            return newTicket
        } catch (error) {
            console.log(error.message);
            return error;   
        }
    }
}