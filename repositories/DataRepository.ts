import { backendConn, placesConn, emailConn } from "./connection";
import _ from 'lodash'

export default class DataRepository {
    // GET REQUESTS
    // Get Staff Accounts
    async GetStaffList(jwt_token: string) {
        const { data } = await backendConn.get('staff_accounts/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Staff Accounts
    async GetCitizenList(jwt_token: string) {
        const { data } = await backendConn.get('citizen_accounts/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Offices Accounts
    async GetOfficesList(jwt_token: string) {
        const { data } = await backendConn.get('offices_accounts/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get All Dockets
    async GetAllDockets(jwt_token: string) {
        const { data } = await backendConn.get('all_dockets/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Current Dockets
    async GetCurrentDockets(jwt_token: string) {
        const { data } = await backendConn.get('current_dockets/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Past Dockets
    async GetPastDockets(jwt_token: string) {
        const { data } = await backendConn.get('past_dockets/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Criminal Cases
    async GetCriminalCases(jwt_token: string) {
        const { data } = await backendConn.get('criminal_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Civil Cases
    async GetCivilCases(jwt_token: string) {
        const { data } = await backendConn.get('civil_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Court Hearings
    async GetCourtHearings(jwt_token: string) {
        const { data } = await backendConn.get('court_hearings/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get Upcoming Hearings
    async GetUpcomingHearings(jwt_token: string) {
        const { data } = await backendConn.get('upcoming_hearings/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get Provinces
    async GetProvinces() {
        const { data } = await placesConn.get('provinces/112300000/cities-municipalities/', {
            headers : { 
                'Content-Type' : 'aplication/json'
            }
        })
        return data
    }
    // Get All Detainees
    async GetAllDetainees(jwt_token: string) {
        const { data } = await backendConn.get('all_detainees/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get PNP Detainees
    async GetPNPDetainees(jwt_token: string) {
        const { data } = await backendConn.get('pnp_detainees/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get BJMP Detainees
    async GetBJMPDetainees(jwt_token: string) {
        const {data} = await backendConn.get('bjmp_detainees/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get Transfered Documents
    async GetTransferedDocuments(jwt_token: string) {
        const {data} = await backendConn.get('transfered_documents/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get Recent Documents
    async GetRecentDocuments(jwt_token: string) {
        const {data} = await backendConn.get('recent_documents/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get Office Documents
    async GetOfficeDocuments(jwt_token: string) {
        const {data} = await backendConn.get('office_documents/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get BuCor Detainees
    async GetBuCorDetainees(jwt_token: string) {
        const {data} = await backendConn.get('bucor_detainees/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get Clustering
    async GetClustering(jwt_token: string) {
        const {data} = await backendConn.get('clustering/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        const clusters = data.clusters.map((cluster: any) => {
            return cluster.imprisonment_span
        }).flat()
        console.log("Fvcking clusters: ", data.clusters)
        // const years = data.clusters.map((cluster: any) => {
        //     return new Date(cluster.last_court_action[0]).getFullYear()
        // })
        // const dbscanCluster = {years : _.uniq(_.map(years)), clusters : clusters}
        const clusterData = clusters.map((cluster: any, index: number) => {
            if (index === 0) {
                return { y : cluster, x : 2022 }
            }
            return { y : cluster, x : 2023 }
        })
        return { formattedCluster : clusterData, formattedYears : undefined }
    }
    // Get Cluster Cases
    async GetClusterCases(jwt_token: string, years: number) {
        const {data} = await backendConn.get(`cluster_cases/${years}`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get Cluster Crimes
    async GetClusterCrimes(jwt_token: string, crime: string) {
        const {data} = await backendConn.get(`cluster_crimes/${crime}`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get Court Proceedings
    async GetCourtProceedings(jwt_token: string) {
        const { data } = await backendConn.get('court_proceedings/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get Case Proceedings
    async GetCaseProceedings(jwt_token: string, case_no: string) {
        const { data } = await backendConn.get(`court_proceedings/${case_no}`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Document Logs
    async GetDocumentLogs(jwt_token: string, document: number, tracker: string) {
        const { data } = await backendConn.get(`document_logs/${document}/${tracker}`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Cases Summary
    async FetchCasesSummary(jwt_token: string) {
        const { data } = await backendConn.get(`cases_summary/`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    // Get Crime Types Summary
    async FetchCrimeTypesSummary(jwt_token: string) {
        const { data } = await backendConn.get(`crime_types_summary/`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        const formattedData = JSON.parse(data).map((data: any) => {
            return { crime_type : data.crime_type.slice(1, -1).replace(/['"]+/g, ""), total : data.count }
        })
        return formattedData
    }
    // Criminal Case Citizens
    async CriminalCaseCitizens(jwt_token: string, case_id: number) {
        const { data } = await backendConn.get(`criminal_case_citizens/${case_id}`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return JSON.parse(data)
    }
    // Civil Case Citizens
    async CivilCaseCitizens(jwt_token: string, case_id: number) {
        const { data } = await backendConn.get(`civil_case_citizens/${case_id}`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return JSON.parse(data)
    }
    // Docket Case Citizens
    async DocketCaseCitizens(jwt_token: string, case_id: number) {
        const { data } = await backendConn.get(`docket_case_citizens/${case_id}`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return JSON.parse(data)
    }
    // Citizen Cases
    async CitizenCases(jwt_token: string) {
        const { data } = await backendConn.get('citizen_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return JSON.parse(data)
    }
    // POST REQUESTS
    // New Case Citizens 
    async NewCaseCitizens(jwt_token: string, formData: any) { 
        console.log('NewCaseCitizens data: ', formData)
        const { data } = await backendConn.post('new_case_citizens/', formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data
    }
    async NewDockets(jwt_token: string, formData: any) { 
        const { data } = await backendConn.post('new_dockets/', formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data
    }
    // Create new court hearing
    async NewCourtHearing(jwt_token: string, formData: any) {
        const { data } = await backendConn.post('new_hearing/', formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data
    }
    // Create new docket
    async NewDocket(jwt_token: string, formData: any) {
        const { data } = await backendConn.post('new_docket/', formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data
    }
    // Create new detainee
    async NewDetainee(jwt_token: string, formData: any) {
        const { data } = await backendConn.post('new_detainee/', formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data
    }
    // Send Document
    async SendDocumentEmail (jwt_token: string, formData: any) {
        await backendConn.post('send_document_email/', formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        const { data } = await emailConn.post('/send-email/', {
            office_name : formData.office_name,
            case_no : formData.case_no,
            qr_tracker : formData.qr_tracker
        })
        console.log("Send email response: ", data)
        return data
    }
    // New Proceeding
    async NewCourtProceeding(jwt_token: string, formData: any) {
        const { data } = await backendConn.post('new_proceeding/', formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data
    }
    // PUT REQUESTS
    // Update account
    async UpdateAccount(jwt_token: string, formData: any, account_id: number) {
        const { data } = await backendConn.put(`account/update/${ account_id }`, formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // Update court hearing
    async UpdateCourtHearing(jwt_token: string, formData: any, hearing_id: number) {
        const { data } = await backendConn.put(`hearing/update/${ hearing_id }`, formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // Update docket
    async UpdateDocket(jwt_token: string, formData: any, docket_id: number) {
        const { data } = await backendConn.put(`docket/update/${ docket_id }`, formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // Update detainee
    async UpdateDetainee(jwt_token: string, formData: any, detainee_id: number) {
        const { data } = await backendConn.put(`detainee/update/${ detainee_id }`, formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // Update document
    async UpdateDocument(jwt_token: string, formData: any, document_id: number) {
        const { data } = await backendConn.put(`document/update/${ document_id }`, formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    async UpdateCourtProceeding(jwt_token: string, formData: any, proceeding_id: number) {
        const { data } = await backendConn.put(`court_proceeding/update/${ proceeding_id }`, formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // DELETE REQUESTS
    // Delete an account
    async DeleteAccount(jwt_token: string, account_id: number) {
        const { data } = await backendConn.delete(`account/delete/${ account_id }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // Delete court hearing
    async DeleteCourtHearing(jwt_token: string, hearing_id: number) {
        const { data } = await backendConn.delete(`hearing/delete/${ hearing_id }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // Delete docket
    async DeleteDocket(jwt_token: string, docket_id: number) {
        const { data } = await backendConn.delete(`docket/delete/${ docket_id }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // Deelete detainee
    async DeleteDetainee(jwt_token: string, detainee_id: number) {
        const { data } = await backendConn.delete(`detainee/delete/${ detainee_id }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // Deelete document
    async DeleteDocument(jwt_token: string, document_id: number) {
        const { data } = await backendConn.delete(`document/delete/${ document_id }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // Delete Court Proceeding
    async DeleteCourtProceeding(jwt_token: string, proceeding_id: number) {
        const { data } = await backendConn.delete(`court_proceeding/delete/${ proceeding_id }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // Delete Case Citizen
    async DeleteCaseCitizen(jwt_token: string, pk: number) {
        const { data } = await backendConn.delete(`case_citizen/delete/${ pk }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
}