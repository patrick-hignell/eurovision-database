import { useState } from 'react'
import { EntryWithImages } from '../../models/entry'

interface Props {
  entry: EntryWithImages
  index: number
  handleImageClose: () => void
  handleImagePrev: () => void
  handleImageNext: () => void
}

export default function ImageFullScreen({
  entry,
  index,
  handleImageClose,
  handleImagePrev,
  handleImageNext,
}: Props) {
  const [leftIsHovered, setLeftIsHovered] = useState<boolean>(false)
  const [rightIsHovered, setRightIsHovered] = useState<boolean>(false)

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <div className="w-fit rounded bg-gradient-to-tr from-[#ff9bf5] to-[#57d5d1] outline outline-white">
        <div className="grid [grid-template-areas:'overlap']">
          <img
            className="[grid-area:overlap]"
            key={entry.images[index]}
            alt={entry.images[index]}
            src={`/images/${entry.images[index]}.png`}
            style={{
              maxHeight: '90vh',
              width: 'auto',
            }}
          />
          <div className="flex justify-between [grid-area:overlap]">
            {leftIsHovered && index > 0 ? (
              <div className="h-full w-32 bg-gradient-to-l from-[#ffffff00] to-[#ffffff61]"></div>
            ) : (
              <div></div>
            )}
            {rightIsHovered && index < entry.images.length - 1 ? (
              <div className="h-full w-32 bg-gradient-to-r from-[#ffffff00] to-[#ffffff61]"></div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="flex flex-col [grid-area:overlap]">
            <div className="flex w-full flex-row-reverse p-2">
              <button
                className=" h-8  w-8 rounded bg-white bg-opacity-25 outline outline-white"
                onClick={handleImageClose}
              >
                <i className="bi bi-x text-3xl"></i>
              </button>
            </div>
            <div className="flex h-full flex-col justify-center">
              <div className="flex h-full flex-1 items-center justify-between">
                {index > 0 ? (
                  <button
                    className="h-full w-24"
                    onClick={() => {
                      handleImagePrev()
                      setLeftIsHovered(false)
                    }}
                    onMouseEnter={() => setLeftIsHovered(true)}
                    onMouseLeave={() => setLeftIsHovered(false)}
                  >
                    <i className="bi bi-caret-left-fill text-5xl"></i>
                  </button>
                ) : (
                  <div></div>
                )}
                {index < entry.images.length - 1 ? (
                  <button
                    className="h-full w-24"
                    onClick={() => {
                      handleImageNext()
                      setRightIsHovered(false)
                    }}
                    onMouseEnter={() => setRightIsHovered(true)}
                    onMouseLeave={() => setRightIsHovered(false)}
                  >
                    <i className="bi bi-caret-right-fill text-5xl"></i>
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
