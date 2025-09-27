"use server"

import { prisma } from "@/lib/prisma"
import { revalidateTag, unstable_cache } from "next/cache"

type TicketType =
    "TBS" |
    "CPO" |
    "ABU_BOILER"

export const getTickets = async () => unstable_cache(async () => {
    const products = await prisma.tickets.findMany()
    return products
}, ['tickets'], { tags: ["tickets"] })

export async function getLatestSequence() {
    const products = await prisma.tickets.findFirst({ orderBy: { id: "desc" } })

    return products
}

export async function createTickets(ticketType: TicketType) {
    revalidateTag("tickets")
    await prisma.tickets.create({ data: { ticketType } })


}