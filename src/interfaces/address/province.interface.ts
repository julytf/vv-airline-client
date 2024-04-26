export interface IProvince {
  _id?: string
  code: string
  name: string
  nameEn: string
  fullName: string
  fullNameEn: string
  codeName: string
  districts?: string[]
}

export default IProvince
