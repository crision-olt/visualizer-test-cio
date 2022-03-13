import { useEffect, useState } from 'react'
import { Point }               from '../components/point/Point'
import { useFirestore }        from '../hooks/useFirestore'

export default function Home () {
  const { getAll } = useFirestore('points')
  const [open, setOpen] = useState(false)
  const [points, setPoints] = useState([])
  useEffect(() => {
    getAll().then(setPoints)
  }, [])

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen min-w-full py-2 bg-black">
        <div className={'absolute'}>
          {points.map((element) => <Point {...{ ...element, open, setOpen, key: element.id }}/>)}
          <img className={'relative max-h-screen'} style={{ zIndex: 1 }}
            src={'https://firebasestorage.googleapis.com/v0/b/porcelanosa-partners-spaces.appspot.com/o/projects%2FdorptVQTHsbkYC60NSlt%2Fscenes%2F1567170849457-base?alt=media&token=cf8bcee2-bf89-4fd9-8bfd-9d4462348844'}/>
        </div>
      </div>

    </>
  )
}
