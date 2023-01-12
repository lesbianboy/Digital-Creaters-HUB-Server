export interface IImage {
  filename: string
  file: Buffer
  uploadTime: Date
}

export interface IImageWithModel extends IImage {
  filename: string
  file: Buffer
  uploadTime: Date
  banner: boolean
}
