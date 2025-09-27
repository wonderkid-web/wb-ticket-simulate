
"use client"

import { createTickets, getLatestSequence } from '@/actions';
import { ReactNode, useState } from 'react'

type Ticket = {
  id: number;
  ticketType: "TBS" | "CPO" | "ABU_BOILER";
}

type TicketObject = {
  TBS: {
    ticketCode: "TBS.OUT"
  },
  CPO: {
    ticketCode: "CPO.OUT"
  },
  ABU_BOILER: {
    ticketCode: "PLL.OUT"
  }
}

const TICKET_OBJECT: TicketObject = {
  TBS: {
    ticketCode: "TBS.OUT"
  },
  CPO: {
    ticketCode: "CPO.OUT"
  },
  ABU_BOILER: {
    ticketCode: "PLL.OUT"
  }
}

function WeighBridge({ children, ticketType, wbNumber }: { children: ReactNode, ticketType: Ticket["ticketType"], wbNumber: "1" | "2" | "3" }) {
  const [ticket, setTicket] = useState<Ticket | null>()
  const [status, setStatus] = useState(false)

  const fetchTicket = async (): Promise<void> => {
    const data = await getLatestSequence()
    setTicket(data)
    setStatus(prev => !prev)
  }


  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl'>Timbangan {wbNumber}</h1>
      <div className='flex justify-between border-2 gap-2 p-2'>
        <div className='flex flex-col gap-2'>
          <button className='bg-purple-900 text-white px-2 py-1' onClick={fetchTicket}>Tombol Mobil Timbang Masuk</button>
          <button
            className='bg-violet-900 text-white px-2 py-1'
            onClick={async () => {
              await createTickets(ticketType)
              await fetchTicket()
            }} disabled={!status}>Tombol Mobil Timbang Keluar</button>
        </div>
        <p>status: <span className={`py-1 px-2 rounded-2xl ${status ? "bg-green-400" : "bg-slate-500"}`}>{!status ? "kosong" : "timbang 1"}</span> | {ticket && `${TICKET_OBJECT[ticketType].ticketCode}.290925.00${ticket?.id}`}</p>
      </div>
      {children}
    </div>
  )
}

export default WeighBridge