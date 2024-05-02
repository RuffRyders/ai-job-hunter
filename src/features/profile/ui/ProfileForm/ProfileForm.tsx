'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  IconExclamationCircle,
  IconPlus,
  IconTrash,
  IconX,
} from '@tabler/icons-react'
import { Button } from '@/common/ui/Button'
import { CustomFieldArray, TextInputController } from '@/common/ui/Form'
import { Heading } from '@/common/ui/Heading'
import { Label } from '@/common/ui/Label'
import { Avatar } from '@/common/ui/Avatar'
import { Input } from '@/common/ui/Input'
import { IconButton } from '@/common/ui/IconButton'

interface ProfileModel {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export function ProfileForm() {
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      location: '',
      email: '',
      phone: '',
      experience: [
        {
          title: 'Hot Diggity Dog',
          description:
            'Made more hot dogs, served more hot dogs. Became one with the hot dog.',
        },
        {
          title: 'Hot Dog on a Stick',
          description: 'Made hot dogs, served hot dogs, end of story.',
        },
      ],
      education: [
        {
          title: 'Academy of Hot Dogs',
        },
      ],
      skills: [{ value: 'Hot Dogs' }],
    },
  })

  const onSubmit: SubmitHandler<ProfileModel> = async (data) => {
    console.log('submit data', data)
    try {
      // if (!jobId) {
      //   await addJobApplication(data)
      // } else {
      //   await updateJobApplication(jobId, data)
      // }
    } catch (error) {
      console.error(error)
    }
  }

  const checkKeyDown = (evt: any) => {
    if (evt.key === 'Enter') evt.preventDefault()
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
      // onKeyDown={(evt) => checkKeyDown(evt)}
    >
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
        <div>
          <Label>Avatar</Label>
          <div className="flex gap-2 items-center">
            <Avatar size="xl" avatarUrl="" />
            <Button>Change Photo</Button>
          </div>
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
          name="phone"
          control={control}
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number..."
        />
        <Heading variant="h2">Work Experience</Heading>
        <CustomFieldArray
          name="experience"
          control={control}
          renderFooter={({ append }) => (
            <Button
              type="button"
              className="self-start"
              onPress={() => {
                append({ title: '' })
              }}
            >
              <IconPlus size={20} />
              Add Work Experience
            </Button>
          )}
          renderRow={(fieldConfig, index, { remove }) => (
            <li key={fieldConfig.id} className="flex gap-2">
              <div className="flex flex-col flex-1 gap-2">
                <TextInputController
                  name={`experience.${index}.title`}
                  control={control}
                  label="Job Title"
                />
                <TextInputController
                  name={`experience.${index}.description`}
                  control={control}
                  label="Description"
                />
                <Button
                  className="self-end"
                  onPress={() => {
                    remove(index)
                  }}
                >
                  <IconTrash size={20} /> Remove
                </Button>
              </div>
            </li>
          )}
        />
        <Heading variant="h2">Education</Heading>
        <CustomFieldArray
          name="education"
          control={control}
          renderFooter={({ append }) => (
            <Button
              type="button"
              className="self-start"
              onPress={() => {
                append({ title: '' })
              }}
            >
              <IconPlus size={20} />
              Add Education
            </Button>
          )}
          renderRow={(fieldConfig, index, { remove }) => (
            <li key={fieldConfig.id} className="flex gap-2">
              <div className="flex flex-col flex-1 gap-2">
                <TextInputController
                  name={`education.${index}.title`}
                  control={control}
                  label="School or University"
                />
                <Button
                  className="self-end"
                  onPress={() => {
                    remove(index)
                  }}
                >
                  <IconTrash size={20} /> Remove
                </Button>
              </div>
            </li>
          )}
        />
        <Heading variant="h2">Skills</Heading>
        <CustomFieldArray
          name="skills"
          control={control}
          renderHeader={({ append }) => (
            <Input
              onEnterPress={(value) => {
                append({ value })
              }}
              placeholder="Add another skill..."
            />
          )}
          renderWrapper={({ children, fields }) => (
            <div className="flex flex-wrap gap-1">{children}</div>
          )}
          renderRow={(fieldConfig, index, { remove }) => (
            <div key={fieldConfig.id} className="flex gap-2">
              <div className="flex flex-col flex-1 gap-2">
                <Controller
                  name={`skills.${index}.value`}
                  control={control}
                  render={({ field, fieldState }) => {
                    console.log({ field, fieldState })
                    return (
                      <div className="flex gap-2 rounded-full bg-gray-200 items-center p-2 pl-4">
                        <span>{field.value}</span>
                        <IconButton onPress={() => remove(index)}>
                          <IconX />
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
          variant="primary"
          type="submit"
          isDisabled={formState.isSubmitting}
        >
          Save
        </Button>
      </div>
    </form>
  )
}
