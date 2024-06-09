import { useCallback, useEffect, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import Card from "../components/Card"
import Centered from "../components/Centered"
import dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'
import { supabase } from "../supabase"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Jakarta')

const ParticipantPage = () => {
  const {cardId} = useParams()
  const navigate = useNavigate()
  const [participant, setParticipant] = useState({
    fullname: 'Loading...',
    role: 'Loading...',
    event: 'Loading...',
    nametag_code: 'Loading...',
  })

  const fetchParticipant = useCallback(async () => {
    const {data, error} = await supabase
      .from('participant')
      .select('*, events(*), nametags(*)')
      .eq('nametags.code', cardId)
      .eq('event', 1)

    const filtered = data.find((p) => p.nametags && p.nametags.code === cardId)

    if (error) {
      alert('Gagal membaca QR code, silahkan cek kembali QR code kamu dan scan ulang.')
      navigate('/')
    }

    setParticipant({
      fullname: filtered?.fullname,
      event: filtered?.events?.name,
      role: filtered?.role,
      nametag_code: filtered?.nametags.code,
    })
  }, [navigate, setParticipant])

  useEffect(() => {
    fetchParticipant()
  }, [])

  return <>
    <Centered>
      <Card>
        <h1 className="text-xl font-light">{participant.event}</h1>
        <h1 className="text-xl font-bold">{participant.nametag_code}.</h1>
        <div className="mt-24">
          <h4 className="text-2xl font-bold">
            {participant.fullname}
          </h4>
          <h4 className="text-xl">
            {participant.role}
          </h4>
        </div>
      </Card>
    </Centered>
  </>
}

export default ParticipantPage
