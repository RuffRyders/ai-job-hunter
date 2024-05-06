'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  IconExclamationCircle,
  IconPlus,
  IconTrash,
  IconX,
} from '@tabler/icons-react'
import { Button } from '@/common/ui/Button'
import {
  FieldArray,
  NumberInput,
  TextInputController,
  SelectInputController,
} from '@/common/ui/Form'
import { Heading } from '@/common/ui/Heading'
import { Label } from '@/common/ui/Label'
import { Avatar } from '@/common/ui/Avatar'
import { Input } from '@/common/ui/Input'
import { IconButton } from '@/common/ui/IconButton'
import { useEffect, useState } from 'react'
import { FileTrigger } from 'react-aria-components'
import { updateUserProfile } from '../../data/serverActions/updateUserProfile'
import { ProfileModel } from '../../data/types'
import { LoadingIndicator } from '@/common/ui/LoadingIndicator'
import { createClient } from '@/common/services/supabase/client'
import { v4 as uuidv4 } from 'uuid'

export function ProfileForm({
  userId,
  values,
}: {
  userId: string
  values: ProfileModel
}) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState('')
  const { control, handleSubmit, formState, reset } = useForm<ProfileModel>({
    defaultValues: {
      firstName: '',
      lastName: '',
      location: '',
      email: '',
      phoneNumber: '',
      experience: [],
      education: [],
      skills: [],
    },
    values,
  })

  const onSubmit: SubmitHandler<ProfileModel> = async (data) => {
    const client = createClient()
    try {
      if (avatarFile) {
        const { type } = avatarFile
        const ext = type === 'image/jpeg' ? 'jpg' : 'png'
        const uuid = uuidv4()
        const fileName = `${userId}/${uuid}.${ext}`
        const { data: imageData, error } = await client.storage
          .from('avatars')
          .upload(fileName, avatarFile, {
            cacheControl: '3600',
            upsert: false,
          })
        if (imageData) {
          data.avatarUrl = `https://hmkrejoaprtoeniopyap.supabase.co/storage/v1/object/public/avatars/${imageData.path}`
        }
      }

      await updateUserProfile(userId, data)

      setAvatarFile(null)
    } catch (error) {
      console.error(error)
    }
  }

  // TODO: reset image when form resets

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setAvatarFile(files[0])
      setAvatarPreviewUrl(URL.createObjectURL(files[0]))
    }
  }

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreviewUrl('')
      return
    }
    if (avatarFile) {
      setAvatarPreviewUrl(URL.createObjectURL(avatarFile))
    }
  }, [avatarFile])

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col flex-1 gap-4 max-w-[500px] m-auto pb-[150px]">
        <div className="font-bold text-3xl">Edit Profile</div>
        <div className="flex flex-col gap-2 p-4 text-sm border border-solid border-primary-600 bg-primary-100 rounded-lg text-primary-900">
          <div className="flex items-center gap-2">
            <IconExclamationCircle size={20} />
            <span className="font-semibold">Private</span>
          </div>
          <div>
            Your profile is <b>private</b>. It can still be used for things like
            tailoring your resume and generating cover letters. We will{' '}
            <b>not</b> use your data without your permission.
          </div>
        </div>
        <Heading variant="h2">Basic Info</Heading>
        <Label>Avatar</Label>
        <div className="flex gap-2 items-center">
          <Avatar size="xl" avatarUrl={avatarPreviewUrl || values.avatarUrl} />
          <FileTrigger
            acceptedFileTypes={['image/png', 'image/jpeg']}
            allowsMultiple={false}
            onSelect={handleFileSelect}
          >
            <Button>Change Photo</Button>
          </FileTrigger>
        </div>
        <TextInputController
          name="firstName"
          control={control}
          label="First Name"
          placeholder="Enter your first name..."
        />
        <TextInputController
          name="lastName"
          control={control}
          label="Last Name"
          placeholder="Enter your last name..."
        />
        <TextInputController
          name="location"
          control={control}
          label="Location"
          placeholder="Enter your location..."
        />
        <TextInputController
          name="email"
          control={control}
          label="Email"
          type="email"
          placeholder="Enter your email address..."
        />
        <TextInputController
          name="phoneNumber"
          control={control}
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number..."
        />
        <Heading variant="h2">Work Experience</Heading>
        <FieldArray
          name="experience"
          control={control}
          renderFooter={({ append }) => (
            <Button
              type="button"
              className="self-start"
              onPress={() => {
                append({ jobTitle: '', companyName: '' })
              }}
            >
              <IconPlus size={20} />
              Add Work Experience
            </Button>
          )}
          renderRow={(fieldConfig, index, { remove }) => (
            <li key={fieldConfig.id} className="flex flex-col gap-4">
              <Heading variant="h6">Work Experience {index + 1}</Heading>
              <TextInputController
                name={`experience.${index}.jobTitle`}
                control={control}
                isRequired
                label="Job Title"
              />
              <TextInputController
                name={`experience.${index}.companyName`}
                control={control}
                isRequired
                label="Company"
              />
              <TextInputController
                name={`experience.${index}.location`}
                control={control}
                label="Location"
              />
              <TextInputController
                name={`experience.${index}.startDate`}
                control={control}
                label="Start Date"
              />
              <TextInputController
                name={`experience.${index}.endDate`}
                control={control}
                label="End Date"
              />
              <TextInputController
                name={`experience.${index}.description`}
                control={control}
                label="Description"
              />
              <Button
                className="self-start"
                color="danger"
                variant="outline"
                onPress={() => {
                  remove(index)
                }}
              >
                <IconTrash size={20} /> Remove
              </Button>
            </li>
          )}
        />
        <Heading variant="h2">Education</Heading>
        <FieldArray
          name="education"
          control={control}
          renderFooter={({ append }) => (
            <Button
              type="button"
              className="self-start"
              onPress={() => {
                append({ schoolName: '', degreeType: '' })
              }}
            >
              <IconPlus size={20} />
              Add Education
            </Button>
          )}
          renderRow={(fieldConfig, index, { remove }) => (
            <li key={fieldConfig.id} className="flex flex-col flex-1 gap-4">
              <Heading variant="h6">Education {index + 1}</Heading>
              <TextInputController
                name={`education.${index}.schoolName`}
                control={control}
                label="School or University"
                isRequired
              />
              <SelectInputController
                name={`education.${index}.degreeType`}
                control={control}
                label="Degree"
                isRequired
                items={[
                  { name: 'Other', value: 'other' },
                  { name: 'GED', value: 'ged' },
                  { name: 'High School', value: 'high_school' },
                  { name: 'Technical Diploma', value: 'technical_diploma' },
                  { name: 'Associates', value: 'associates' },
                  { name: 'Non-Degree Program', value: 'non_degree_program' },
                  { name: 'Bachelor', value: 'bachelor' },
                  { name: 'Higher Degree', value: 'higher_degree' },
                  { name: 'Masters', value: 'masters' },
                  { name: 'Doctorate', value: 'doctorate' },
                ]}
              />
              <TextInputController
                name={`education.${index}.discipline`}
                control={control}
                label="Field of Study"
              />
              <Controller
                name={`education.${index}.gpa`}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberInput
                      step={0.1}
                      minValue={0}
                      maxValue={4}
                      label="GPA"
                      {...field}
                    />
                  )
                }}
              />
              <Button
                className="self-start"
                color="danger"
                variant="outline"
                onPress={() => {
                  remove(index)
                }}
              >
                <IconTrash size={20} /> Remove
              </Button>
            </li>
          )}
        />
        <Heading variant="h2">Skills</Heading>
        <FieldArray
          name="skills"
          control={control}
          renderHeader={({ append }) => (
            <Input
              onEnterPress={(name) => {
                append({ name })
              }}
              placeholder="Add another skill..."
            />
          )}
          renderWrapper={({ children }) => (
            <div className="flex flex-wrap gap-1">{children}</div>
          )}
          renderRow={(fieldConfig, index, { remove }) => (
            <div key={fieldConfig.id} className="flex gap-2">
              <div className="flex flex-col flex-1 gap-2">
                <Controller
                  name={`skills.${index}.name`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className="text-sm flex gap-2 rounded-full bg-gray-200 items-center p-1 pl-4">
                        <span>{field.value}</span>
                        <IconButton onPress={() => remove(index)}>
                          <IconX size={20} />
                        </IconButton>
                      </div>
                    )
                  }}
                />
              </div>
            </div>
          )}
        />
      </div>
      <div className="flex gap-2 justify-center absolute bottom-0 left-0 right-0 bg-white p-4">
        <Button isDisabled={formState.isSubmitting} onPress={() => reset()}>
          Reset
        </Button>
        <Button
          color="primary"
          type="submit"
          isDisabled={formState.isSubmitting}
        >
          Save {formState.isSubmitting && <LoadingIndicator />}
        </Button>
      </div>
    </form>
  )
}
