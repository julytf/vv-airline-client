import { ObjectId, Schema, model } from 'mongoose'

export interface ICountry {
  code: string
  name: string
  nameEn: string
  fullName: string
  fullNameEn: string
  codeName: string
  provinces?: Schema.Types.ObjectId[]
}
export default ICountry
