import { Finger }              from '../../assets/Finger'
import { Material }            from '../material/Material'
import { Modal }               from '../modal/Modal'
import { useFirestore }        from '../../hooks/useFirestore'
import { useEffect, useState } from 'react'

export const Point = ({ coordY, coordX, id, open, setOpen }) => {
  const getVisibility = () => open ? 'invisible' : 'visible'
  const [materials, setMaterials] = useState([])
  const [material, setMaterial] = useState(undefined)
  const { getById } = useFirestore('materials')
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    getById(id).then((result) => {
      setMaterials(result.materials)
    })
  }, [])
  const selectPoint = () => {
    setOpen(true)
    setOpenModal(true)
  }
  const selectMaterial = (mats) => () => {
    setMaterial(mats)
    onClose()
  }
  const onClose = () => {
    setOpen(false)
    setOpenModal(false)
  }
  const isSelected = (mats) => () => material ? mats.id === material.id : false

  return (
    <>
      <button className={`absolute z-10 bg-blue-400/50 rounded-full ${getVisibility()}`}
        style={{ top: `${coordY}%`, left: `${coordX}%` }} onClick={selectPoint}><Finger/></button>
      <Modal.Frame open={openModal} onClose={onClose}>
        {materials.map((element) => <Material key={element.id} {...{
          ...element,
          select: selectMaterial(element),
          isSelected: isSelected(element)
        }}/>)}
      </Modal.Frame>
      {material && <img alt={material.name} className={'absolute max-h-screen'} style={{ zIndex: 3 }} src={material.layer}/>}
    </>
  )
}