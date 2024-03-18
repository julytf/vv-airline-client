import Button from '@/components/ui/Button'
import { UserGender, UserRole } from '@/enums/user.enums'
import IAddress from '@/interfaces/address/address.interface'
import ICountry from '@/interfaces/address/country.interface'
import IBlog from '@/interfaces/blog/blog.interface'
import addressService from '@/services/address.service'
import blogsService from '@/services/blogs.service'
import filesService from '@/services/files.service'
import updateUserSchema from '@/utils/validations/user/updateUser.schema'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Editor } from '@ckeditor/ckeditor5-core'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { FileLoader, UploadAdapter } from '@ckeditor/ckeditor5-upload'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { FunctionComponent, useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

interface IFormData {
  title: string
  summary?: string
  coverImage?: string
  content: string
}

const formSchema = Joi.object({
  title: Joi.string(),
  summary: Joi.string(),
  coverImage: Joi.string(),
  content: Joi.string(),
})

interface CreateBlogProps {}

const CreateBlog: FunctionComponent<CreateBlogProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: joiResolver(formSchema),
  })

  const watchAllFields = watch()

  console.log(isValid)
  console.log(errors)
  console.log(formSchema.validate(watchAllFields))

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data)

    await blogsService.createBlog(data as IBlog)
    // reset()
  }

  return (
    <div className='flex justify-center p-8'>
      <form method='post' className='max-w-3xl flex-1 rounded-md bg-white p-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='mx-auto w-full max-w-sm pt-6'>
          <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Thêm Blog</h2>
        </div>
        <div className='mx-auto'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-6 gap-x-6 gap-y-8 '>
                <div className='col-span-6'>
                  <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-900'>
                    Tiêu đề
                  </label>
                  <Controller
                    name={'title'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id='title'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='text'
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                <div className='col-span-6'>
                  <label htmlFor='summary' className='block text-sm font-medium leading-6 text-gray-900'>
                    Tóm tắt
                  </label>
                  <Controller
                    name={'summary'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id='summary'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='text'
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                <div className='col-span-6'>
                  <label htmlFor='coverImage' className='block text-sm font-medium leading-6 text-gray-900'>
                    Ảnh
                  </label>
                  <Controller
                    name={'coverImage'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id='coverImage'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='text'
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                <div className='col-span-6'>
                  <label htmlFor='coverImage' className='block text-sm font-medium leading-6 text-gray-900'>
                    Ảnh
                  </label>

                  <Controller
                    name={'content'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div className='prose'>
                          <CKEditor
                            config={{
                              extraPlugins: [uploadPlugin],
                            }}
                            editor={ClassicEditor}
                            onReady={(editor) => {
                              console.log('CKEditor5 React Component is ready to use!', editor)
                            }}
                            data={field.value || ''}
                            onChange={(event, editor) => {
                              const data = editor.getData()
                              console.log({ event, editor, data })
                              field.onChange(data)
                            }}
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6 p-6'>
          <Button disabled={!isValid}>Lưu</Button>
        </div>
      </form>
    </div>
  )
}

function uploadAdapter(loader: FileLoader): UploadAdapter {
  return {
    upload: async () => {
      try {
        const file = await loader.file
        const filename = filesService.uploadImage(file!)
        return {
          default: `local.test:3000/${filename}`,
        }
      } catch (error) {
        throw new Error('Error uploading file')
      }
    },
    abort: () => {
      console.log('Abort upload')
    },
  }
}
function uploadPlugin(editor: Editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: FileLoader) => {
    return uploadAdapter(loader)
  }
}

export default CreateBlog
