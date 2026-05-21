import { authServices } from "../auth/auth.service"
import type { Issues } from "./issues.interface"

const createIssueIntoDB = async (payload:Issues) =>{
    const {title,description,type,reporter_id} = payload
    const user = await authServices.getUserById(reporter_id)
    if(!user){
        throw new Error("user not found")
    }
    return user

}
const getAllIssuesFromDB = async () =>{

}
const getSingleIssuesFromDB = async () =>{

}
const updateIssueFromDB = async () =>{

}
const deleteIssueFromDB = async () =>{

}

export const issuesServices = {
    createIssueIntoDB,
    getAllIssuesFromDB,
    getSingleIssuesFromDB,
    updateIssueFromDB,
    deleteIssueFromDB
}