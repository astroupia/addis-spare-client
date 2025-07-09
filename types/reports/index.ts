export type ReportType = "sales" | "inventory" | "userActivity" | string

export interface IReport {
  _id: string
  type: ReportType
  parameters: Record<string, any> 
  generatedBy: string
  generatedAt: string 
  outputLocation: string
}



export interface IReportCreateDto {
  type: ReportType
  parameters: Record<string, any>
  generatedBy: string
  generatedAt: string
  outputLocation: string
}

export type IReportUpdateDto = Partial<IReportCreateDto>
