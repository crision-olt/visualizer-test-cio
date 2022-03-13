export const Material = ({ name, thumbnail, select, isSelected }) => (
  <div className={`w-min flex flex-row ml-auto p-1 rounded bg-white/50 items-center align-center`}>
    {isSelected() && <span className={'shrink-0 w-28 text-center text-xs px-2'}>{name}</span>}
    <button title={name} className={`w-28 h-28 rounded`} onClick={select}>
      <img alt={name} className={'h-full w-full rounded object-cover'} src={thumbnail}/>
    </button>
  </div>
)

