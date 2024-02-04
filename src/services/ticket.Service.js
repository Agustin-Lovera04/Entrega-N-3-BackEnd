export class TicketService{
    constructor(dao){
        this.dao = new dao()
    }

    async getTicket(id){
        return await this.dao.getTicket(id)
    }

    async createTicket(content){
        return await this.dao.createTicket(content)
    }
}

import { TicketsDAO } from "../dao/ticketsDAO.js"
export const ticketService = new TicketService(TicketsDAO)