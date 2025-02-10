interface ActionResponse {
    success: boolean
    message?: string
    inputs?: PropertyList
    errors?: {
        [K in keyof PropertyList]?: string[]
    }
}