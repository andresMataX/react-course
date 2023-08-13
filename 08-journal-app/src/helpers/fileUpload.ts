import { CloudResp } from '../interfaces/cloudResp'

export const fileUpload = async (file: File) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/duall7uxd/upload'

  const formData = new FormData()

  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    })

    if (!resp.ok) throw new Error('No se pudo subir imagen')

    const cloudResp: CloudResp = await resp.json()

    return cloudResp.secure_url
  } catch (error: any) {
    throw new Error(error.message)
  }
}
