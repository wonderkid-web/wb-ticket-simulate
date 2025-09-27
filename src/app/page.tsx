
import { getTickets } from '@/actions'
import WeighBridge from '@/component/wb/WeighBridge'

async function page() {
  const raw = await getTickets()
  const products = await raw()


  return (
    <div>
      <div className='flex gap-2 p-4 justify-between'>
        <WeighBridge ticketType='TBS' wbNumber='1'>
          <></>
        </WeighBridge>
        <WeighBridge ticketType='CPO' wbNumber='2'>
          <></>
        </WeighBridge>
        <WeighBridge ticketType='ABU_BOILER' wbNumber='3'>
          <></>
        </WeighBridge>
      </div>
      <div className='grid grid-cols-4 justify-center gap-4'>
        {
          products.map(p => <div key={p.id} className='px-2 py-1 bg-yellow-400 text-black'>{p.ticketType == "ABU_BOILER" ? "PLL" : p.ticketType}.OUT.290925.00{p.id} | {p.ticketType}</div>)
        }
      </div>
    </div>
  )
}

export default page