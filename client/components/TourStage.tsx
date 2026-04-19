import { TourType } from '../../models/entry'

export default function TourStage({ icon, text, button1, button2 }: TourType) {
  return (
    <div className="flex flex-col gap-4">
      {icon && <i className={`bi bi-${icon} pt-1 text-3xl`}></i>}
      <p className="text-xl">{text}</p>
      <div className="flex justify-evenly">
        <button
          className="my-2 rounded-full bg-white bg-opacity-25 px-4 py-1 text-xl outline outline-1 outline-white hover:bg-opacity-75"
          onClick={button1.fn}
        >
          {button1.label}
        </button>
        <button
          className="my-2 rounded-full bg-white bg-opacity-25 px-2 py-1 text-xl outline outline-1 outline-white hover:bg-opacity-75"
          onClick={button2.fn}
        >
          {button2.label}
        </button>
      </div>
    </div>
  )
}
