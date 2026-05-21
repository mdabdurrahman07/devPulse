export interface Issues {
    title:string,
    description:string,
    type: "bug" | "feature_request",
    status: "open" | "in_progress" | "resolved",
    reporter_id: string
}