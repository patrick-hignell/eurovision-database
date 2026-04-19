import { useState } from 'react'
import TourStage from './TourStage'
import { TourType } from '../../models/entry'

interface Props {
  handleTourClose: () => void
  handleTourHighlight: (highlight: string) => void
}

export default function Tour({ handleTourClose, handleTourHighlight }: Props) {
  const [index, setIndex] = useState<number>(0)

  function nextIndex() {
    setIndex((prev) => {
      handleTourHighlight(tourStages[prev + 1].highlight)
      return prev + 1
    })
  }

  function prevIndex() {
    setIndex((prev) => {
      handleTourHighlight(tourStages[prev - 1].highlight)
      return prev - 1
    })
  }

  function onTourClose() {
    handleTourClose()
    handleTourHighlight('')
    setIndex(0)
  }

  const tourStages: TourType[] = [
    {
      text: 'Would you like to take a tour?',
      button1: { label: 'Yes', fn: nextIndex },
      button2: { label: 'No', fn: onTourClose },
      highlight: '',
    },
    {
      icon: 'grid-3x3-gap-fill',
      text: 'Click any of the entries below to show their Info at the top and their media in the Gallery.',
      button1: { label: 'Prev', fn: prevIndex },
      button2: { label: 'Next', fn: nextIndex },
      highlight: 'icons',
    },
    {
      icon: 'sort-up',
      text: 'Click the Sort icon to change the order of the entries between ascending and descending. Change the dropdown next to the Sort icon to change the category.',
      button1: { label: 'Prev', fn: prevIndex },
      button2: { label: 'Next', fn: nextIndex },
      highlight: 'sort',
    },
    {
      icon: 'funnel-fill',
      text: 'Click the Filter icon to open up the filter options. You can then filter the entries by any category. Use Select Multiple when wanting to filter by multiple options.',
      button1: { label: 'Prev', fn: prevIndex },
      button2: { label: 'Next', fn: nextIndex },
      highlight: 'filter',
    },
    {
      icon: 'star-fill',
      text: 'Click the Add Favourite icon to add the currently selected entry to your Favourites. You can then easily find your Favourites by selecting Favourite in Sort or Filter options.',
      button1: { label: 'Prev', fn: prevIndex },
      button2: { label: 'Next', fn: nextIndex },
      highlight: 'favourite',
    },
    {
      icon: 'gear-fill',
      text: 'Click the Options icon to open the Options menu. You can change the image size for icons and in the gallery, change what details are shown underneath each icon and change from Icon to Spreadsheet mode.',
      button1: { label: 'Prev', fn: prevIndex },
      button2: { label: 'Finish', fn: onTourClose },
      highlight: 'options',
    },
    {
      text: '',
      button1: { label: 'Prev', fn: prevIndex },
      button2: { label: 'Finish', fn: onTourClose },
      highlight: '',
    },
  ]

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-fit w-fit max-w-[40rem] rounded bg-gradient-to-tr from-[#ff9bf5] to-[#57d5d1] px-4 pb-6 pt-4 outline outline-white">
        {index > 0 && (
          <div className="flex w-full flex-row-reverse">
            <button
              className=" h-8  w-8 rounded bg-white bg-opacity-25 outline outline-white"
              onClick={onTourClose}
            >
              <i className="bi bi-x text-3xl"></i>
            </button>
          </div>
        )}
        <TourStage {...tourStages[index]} />
      </div>
    </div>
  )
}
