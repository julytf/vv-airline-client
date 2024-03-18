import IProvince from './province.interface'

export interface ICountry {
  _id: string
  code: string
  name: string
  nameEn: string
  fullName: string
  fullNameEn: string
  codeName: string
  provinces?: IProvince[]
}
export default ICountry
