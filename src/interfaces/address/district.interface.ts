export interface IDistrict {
  _id?: string
  code: string
  name: string
  nameEn: string
  fullName: string
  fullNameEn: string
  codeName: string
  provinceCode: string
  // province: string
  wards?: string[]
}

export default IDistrict
