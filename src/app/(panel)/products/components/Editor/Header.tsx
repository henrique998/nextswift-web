import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from 'lucide-react'
import { Separator } from './Separator'
import { TextTypeSelector } from './TextTypeSelector'
import { ToggleItem } from './ToggleItem'
import { LinkButton } from './LinkButton'

interface StateData {
  onToggle: () => void
  isActive: boolean
}

export interface HeadingsData {
  headingH1Data: StateData
  headingH2Data: StateData
  headingH3Data: StateData
  headingH4Data: StateData
  headingH5Data: StateData
  headingH6Data: StateData
}

interface EditorHeaderProps {
  boldData: StateData
  italicData: StateData
  underlineData: StateData
  strikeData: StateData
  orderedListData: StateData
  bulletListData: StateData
  headingsData: HeadingsData
  onAlignTextLeft: () => void
  onAlignTextCenter: () => void
  onAlignTextRight: () => void
  onSetLink: (url: string) => void
}

export function EditorHeader({
  boldData,
  italicData,
  underlineData,
  strikeData,
  bulletListData,
  orderedListData,
  headingsData,
  onAlignTextLeft,
  onAlignTextCenter,
  onAlignTextRight,
  onSetLink,
}: EditorHeaderProps) {
  return (
    <div className="flex w-full items-center rounded-tl-lg rounded-tr-lg border-2 border-b-0 border-gray-200 p-2">
      <div
        aria-label="Text editor"
        className="flex flex-wrap items-center gap-2"
      >
        <TextTypeSelector headingsData={headingsData} />

        <Separator />

        <ToggleItem
          value="bold"
          isActive={boldData.isActive}
          onClick={boldData.onToggle}
        >
          <Bold className="h-4 w-4" />
        </ToggleItem>

        <ToggleItem
          value="italic"
          isActive={italicData.isActive}
          onClick={italicData.onToggle}
        >
          <Italic className="h-4 w-4" />
        </ToggleItem>

        <ToggleItem
          value="underline"
          isActive={underlineData.isActive}
          onClick={underlineData.onToggle}
        >
          <Underline className="h-4 w-4" />
        </ToggleItem>

        <ToggleItem
          value="line-through"
          isActive={strikeData.isActive}
          onClick={strikeData.onToggle}
        >
          <Strikethrough className="h-4 w-4" />
        </ToggleItem>

        <LinkButton onSetLink={onSetLink} />

        <Separator />

        <ToggleItem value="align-left" onClick={onAlignTextLeft}>
          <AlignLeft className="h-4 w-4" />
        </ToggleItem>

        <ToggleItem value="align-center" onClick={onAlignTextCenter}>
          <AlignCenter className="h-4 w-4" />
        </ToggleItem>

        <ToggleItem value="align-right" onClick={onAlignTextRight}>
          <AlignRight className="h-4 w-4" />
        </ToggleItem>

        <Separator />

        <ToggleItem
          value="ul"
          isActive={bulletListData.isActive}
          onClick={bulletListData.onToggle}
        >
          <List className="h-4 w-4" />
        </ToggleItem>

        <ToggleItem
          value="ol"
          isActive={orderedListData.isActive}
          onClick={orderedListData.onToggle}
        >
          <ListOrdered className="h-4 w-4" />
        </ToggleItem>
      </div>
    </div>
  )
}
