import { ticketsModel } from "./models/ticketModel.js";


export class TicketsDAO{
    constructor(){}
    async createTicket(content, total){
        try {
            let newTicket = ticketsModel.create(content)
            return newTicket
        } catch (error) {
            console.log(error.message);
            return error;   
        }
    }

    async getTicketByID(tid){
        console.log(tid)
     try {
        let ticket = ticketsModel.findOne(tid)
        return ticket
     } catch (error) {
        return error
     }
    }
}