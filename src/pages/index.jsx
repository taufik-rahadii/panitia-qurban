import { useState } from "react"
import { QrReader } from "react-qr-reader"
import { useNavigate } from "react-router-dom"

const IndexPage = () => {
  const [showScanner, setShowScanner] = useState(false)
  const [counter, setCounter] = useState(0)
  const navigate = useNavigate()
     
  return <>
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white shadow-md px-20 py-10 rounded-lg text-center">
        <h1 className="text-3xl font-bold">Scanner ID Card Panitia Qurban</h1>
        <p>Scan QR Code untuk mengetahui detail panitia qurban.</p>

        {showScanner ? 
            <QrReader 
              constraints={{facingMode: {exact: 'environment'} }} 
              scanDelay={500} 
              onResult={(result, error) => {
                if (!!result) {
                  navigate(`/participant/${result}`)
                }

                if (!!error) {
                  if (counter <= 3) {
                    setCounter(counter + 1)
                  } else {
                    alert('Gagal memindai QR Code')
                  }
                }
              }} 
            /> : <></>
        }

        <button onClick={() => setShowScanner(true)} className="rounded-lg shadow-sm bg-sky-500 font-bold px-5 py-2 text-white mt-12">Scan QR Sekarang</button>
      </div>
    </div>
  </>
}

export default IndexPage

