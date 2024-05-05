import { useEffect, useState } from 'react'
import {
  DropZone,
  FileDropItem,
  FileTrigger,
  FileTriggerProps,
} from 'react-aria-components'
import { DropEvent } from 'react-aria'
import { Button } from '@/common/ui/Button'
import { IconTrash } from '@tabler/icons-react'
import { IconButton } from '@/common/ui/IconButton'

interface FileUploadFieldProps extends FileTriggerProps {}

export function FileUploadField({ ...props }: FileUploadFieldProps) {
  const [files, setFiles] = useState<File[] | null>(null)
  const [imageSource, setImageSource] = useState('#')

  useEffect(() => {
    if (!files) {
      setImageSource('')
      return
    }
    if (files.length > 0) {
      setImageSource(URL.createObjectURL(files[0]))
    }
  }, [files])

  const onSelect = async (e: FileList | null) => {
    if (!e) {
      return
    }
    let files = Array.from(e)
    setFiles(files)
  }

  const onDrop = async (e: DropEvent) => {
    let files = e.items.filter((file) => file.kind === 'file') as FileDropItem[]

    if (files.length > 0) {
      setImageSource(URL.createObjectURL(await files[0].getFile()))
    }

    const result = await Promise.all(
      files.map(async (file) => await file.getFile()),
    )

    setFiles(result)
  }

  const onRemoveFiles = () => {
    setFiles(null)
  }

  return (
    <div className="flex flex-1 self-stretch items-center justify-center relative">
      {files ? (
        <div className="flex flex-1">
          <div className="absolute right-[5px] top-[5px]">
            <IconButton onPress={onRemoveFiles}>
              <IconTrash />
            </IconButton>
          </div>
          <img className="flex flex-1" src={imageSource} alt="Preview Image" />
        </div>
      ) : (
        <DropZone onDrop={onDrop}>
          <FileTrigger {...props} onSelect={onSelect}>
            <Button className="flex">Select files</Button>
          </FileTrigger>
        </DropZone>
      )}
    </div>
  )
}
