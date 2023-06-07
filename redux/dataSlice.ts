import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DataRepository from '../repositories/DataRepository'
import AuthRepository from '../repositories/AuthRepository'
import moment from "moment";
import _ from "lodash"

interface DataShape {
    dataLoading: boolean;
    userInfo: any;
    staffList: any;
    citizenList: any;
    officesList: any;
    provinceList: any;
    allDocketList: any;
    currentDocketList: any;
    pastDocketList: any;
    criminalCaseList: any;
    civilCaseList: any;
    courtHearingList: any;
    upcomingHearingList: any;
    allRecords: any;
    pnpRecords: any;
    bjmpRecords: any;
    bucorRecords: any;
    transferedDocuments: any;
    officeDocuments: any;
    recentDocuments: any;
    clusterList: any;
    newCluster: any;
    clusterYears: any;
    clusterCases: any;
    clusterCrimes: any;
    courtProceedingsList: any;
    caseProceedingsList: any;
    activityLogs: any;
    isNewData: boolean;
    documentLogs: any;
    casesSummaryList: any;
    crimeTypesSummaryList: any;
    criminalCaseCitizensList: any;
    civilCaseCitizensList: any;
    docketCaseCitizensList: any;
    citizenCasesList: any;
    crimeList: any;
    criminalCrimeList: any;
    civilCrimeList: any;
    activeCount: number;
    closedCount: number;
}

const initialState: DataShape = {
    dataLoading : false,
    userInfo : {},
    staffList : [],
    citizenList : [],
    officesList : [],
    provinceList : [],
    allDocketList : [],
    currentDocketList : [],
    pastDocketList : [],
    criminalCaseList : [],
    civilCaseList : [],
    courtHearingList : [],
    upcomingHearingList : [],
    allRecords : [],
    pnpRecords : [],
    bjmpRecords : [],
    bucorRecords : [],
    transferedDocuments : [],
    officeDocuments: [],
    recentDocuments : [],
    clusterList : [],
    newCluster : [],
    clusterYears : [],
    clusterCases : [],
    clusterCrimes : [],
    courtProceedingsList : [],
    caseProceedingsList : [],
    activityLogs : [],
    isNewData : false,
    documentLogs : [],
    casesSummaryList : [],
    crimeTypesSummaryList : [],
    criminalCaseCitizensList : [],
    civilCaseCitizensList : [],
    docketCaseCitizensList : [],
    citizenCasesList : [],
    crimeList : [],
    criminalCrimeList : [],
    civilCrimeList : [],
    activeCount: 0,
    closedCount: 0,
}

// ACCOUNT THUNKS
export const getUserInfo = createAsyncThunk(
    'data/getUserInfo',
    async (user_id: number) => {
        const authRepo = new AuthRepository()
        return await authRepo.GetAccountDetails(localStorage.jwt_token, user_id)
    }
)

export const deleteAccount = createAsyncThunk(
    'data/deleteAccount', 
    async (account_id: number) => {
        const dataRepo = new DataRepository()
        return await dataRepo.DeleteAccount(localStorage.jwt_token, account_id)
    } 
)

export const getStaffList = createAsyncThunk(
    'data/getStaffList',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetStaffList(localStorage.jwt_token)
    }
)

export const getCitizenList = createAsyncThunk(
    'data/getCitizenList',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCitizenList(localStorage.jwt_token)
    }
)

export const getOfficesList = createAsyncThunk(
    'data/getOfficesList',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetOfficesList(localStorage.jwt_token)
    }
)

export const updateAccount = createAsyncThunk(
    'data/updateAccount',
    async (args: { formData: any, account_id: number }) => {
        const dataRepo = new DataRepository()
        await dataRepo.UpdateAccount(localStorage.jwt_token, args.formData, args.account_id)
    }
)

// PLACES THUNKS
export const getProvinces = createAsyncThunk(
    'data/getProvinces',
    async () => {
        const dataRepo = new DataRepository()
        const provinces = await dataRepo.GetProvinces()
        const formattedProvinces = provinces.map((province: any) => {
            return { label : province.name, value : province.name }
        })
        return formattedProvinces
    }
)

// HEARING THUNKS 
export const getCourtHearings = createAsyncThunk(
    'data/getCourtHearings',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCourtHearings(localStorage.jwt_token)
    }
)

export const getUpcomingHearings = createAsyncThunk(
    'data/getUpcomingHearings',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetUpcomingHearings(localStorage.jwt_token)
    }
)

export const createNewHearing = createAsyncThunk(
    'data/createNewHearing',
    async (formData: any) => {
        const dataRepo = new DataRepository()
        await dataRepo.NewCourtHearing(localStorage.jwt_token, formData)
    }
)

export const updateHearing = createAsyncThunk(
    'data/updateHearing',
    async (args: { formData: any, hearing_id: number }) => {
        const dataRepo = new DataRepository()
        await dataRepo.UpdateCourtHearing(localStorage.jwt_token, args.formData, args.hearing_id)
    }
)

export const deleteHearing = createAsyncThunk(
    'data/deleteHearing',
    async (hearing_id: number) => {
        const dataRepo = new DataRepository()
        await dataRepo.DeleteCourtHearing(localStorage.jwt_token, hearing_id)
    }
)

// DOCKET THUNKS
export const fetchCasesSummary = createAsyncThunk(
    'data/fetchCasesSummary',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.FetchCasesSummary(localStorage.jwt_token)
    }
)

export const fetchCrimeTypesSummary = createAsyncThunk(
    'data/fetchCrimeTypesSummary',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.FetchCrimeTypesSummary(localStorage.jwt_token)
    }
)

export const getAllDockets = createAsyncThunk(
    'data/getAllDockets',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetAllDockets(localStorage.jwt_token)
    }
)

export const getCurrentDockets = createAsyncThunk(
    'data/getCurrentDockets',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCurrentDockets(localStorage.jwt_token)
    }
)

export const getPastDockets = createAsyncThunk(
    'data/getPastDockets',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetPastDockets(localStorage.jwt_token)
    }
)

export const getCriminalCases = createAsyncThunk(
    'data/getCriminalCases',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCriminalCases(localStorage.jwt_token)
    }
)

export const getCivilCases = createAsyncThunk(
    'data/getCivilCases',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCivilCases(localStorage.jwt_token)
    }
)

export const createNewDocket = createAsyncThunk(
    'data/createNewDocket',
    async (formData: any) => {
        const dataRepo = new DataRepository()
        await dataRepo.NewDocket(localStorage.jwt_token, formData)
    }
)

export const newDockets = createAsyncThunk(
    'data/newDockets',
    async (formData: any) => {
        const dataRepo = new DataRepository()
        await dataRepo.NewDockets(localStorage.jwt_token, formData)
    }
)

export const updateDocket = createAsyncThunk(
    'data/updateDocket',
    async (args: {formData: any, docket_id: number}) => {
        const dataRepo = new DataRepository()
        await dataRepo.UpdateDocket(localStorage.jwt_token, args.formData, args.docket_id)
    }
)

export const deleteDocket = createAsyncThunk(
    'data/deleteDocket',
    async (docket_id: number) => {
        const dataRepo = new DataRepository()
        await dataRepo.DeleteDocket(localStorage.jwt_token, docket_id)
    }
)

// DETAINEE THUNKS
export const getAllDetainees = createAsyncThunk(
    'data/getAllDetainees',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetAllDetainees(localStorage.jwt_token)
    }
)

// DETAINEE THUNKS
export const getPNPDetainees = createAsyncThunk(
    'data/getPNPDetainees',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetPNPDetainees(localStorage.jwt_token)
    }
)

export const getBJMPDetainees = createAsyncThunk(
    'data/getBJMPDetainees',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetBJMPDetainees(localStorage.jwt_token)
    }
)

export const getBuCorDetainees = createAsyncThunk(
    'data/getBuCorDetainees',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetBuCorDetainees(localStorage.jwt_token)
    }
)

export const createNewDetainee = createAsyncThunk(
    'data/createNewDetainee',
    async (formData: any) => {
        const dataRepo = new DataRepository()
        await dataRepo.NewDetainee(localStorage.jwt_token, formData)
    }
)

export const updateDetainee = createAsyncThunk(
    'data/updateDetainee', 
    async (args: {formData: any, detainee_id: number}) => {
        const dataRepo = new DataRepository()
        await dataRepo.UpdateDetainee(localStorage.jwt_token, args.formData, args.detainee_id)
    }
)

export const deleteDetainee = createAsyncThunk(
    'data/deleteDetainee',
    async (detainee_id: number) => {
        const dataRepo = new DataRepository()
        await dataRepo.DeleteDetainee(localStorage.jwt_token, detainee_id)
    }
)

// TRANSFERED DOCUMENT THUNKS
export const sendDocumentEmail = createAsyncThunk(
    'data/sendDocumentEmail',
    async (formData: any) => {
        const dataRepo = new DataRepository()
        await dataRepo.SendDocumentEmail(localStorage.jwt_token, formData)
    }
)

export const getTransferedDocuments = createAsyncThunk(
    'data/getTransferedDocuments',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetTransferedDocuments(localStorage.jwt_token)
    }
)

export const getDocumentLogs = createAsyncThunk(
    'data/getDocumentLogs',
    async (args: { document: any; tracker: any; }) => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetDocumentLogs(localStorage.jwt_token, Number(args.document), args.tracker)
    }
)

export const getOfficeDocuments = createAsyncThunk(
    'data/getOfficeDocuments',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetOfficeDocuments(localStorage.jwt_token)
    }
)

export const getRecentDocuments = createAsyncThunk(
    'data/getRecentDocuments',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetRecentDocuments(localStorage.jwt_token)
    }
)

export const updateDocument = createAsyncThunk(
    'data/updateDocument',
    async (args: { formData: any, document_id: number }) => {
        const dataRepo = new DataRepository()
        return await dataRepo.UpdateDocument(localStorage.jwt_token, args.formData, args.document_id)
    }
)

export const deleteDocument = createAsyncThunk(
    'data/deleteDocument',
    async (document_id: number) => {
        const dataRepo = new DataRepository()
        return await dataRepo.DeleteDocument(localStorage.jwt_token, document_id)
    }
) 

// CLUSTERING
export const getClustering = createAsyncThunk(
    'data/getClustering',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetClustering(localStorage.jwt_token)
    }
)

export const getClusterCases = createAsyncThunk(
    'data/getClusterCases',
    async (years: number) => {
        const dataRepo = new DataRepository()
        const currClusterCases = await dataRepo.GetClusterCases(localStorage.jwt_token, years)
        const fileteredClusterCases = _.uniqBy(currClusterCases, "crime_type")
        return fileteredClusterCases
    }
)

export const getClusterCrimes = createAsyncThunk(
    'data/getClusterCrimes',
    async (crime: string) => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetClusterCrimes(localStorage.jwt_token, crime)
    }
)

// COURT PROCEEDING THUNKS
export const newCourtProceeding = createAsyncThunk(
    'data/newCourtProceeding',
    async (formData: any) => {
        const dataRepo = new DataRepository()
        await dataRepo.NewCourtProceeding(localStorage.jwt_token, formData)
    }
)

export const getCourtProceedings = createAsyncThunk(
    'data/getCourtProceedings',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCourtProceedings(localStorage.jwt_token)
    }
)

export const getCaseProceedings = createAsyncThunk(
    'data/getCaseProceedings',
    async (case_no: any) => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCaseProceedings(localStorage.jwt_token, case_no)
    }
)

export const updateProceeding = createAsyncThunk(
    'data/updateProceeding',
    async (args: { formData: any, proceeding_id: number }) => { 
        const dataRepo = new DataRepository()
        await dataRepo.UpdateCourtProceeding(localStorage.jwt_token, args.formData, args.proceeding_id)
    }
)

export const deleteCourtProceeding = createAsyncThunk(
    'data/deleteCourtProceeding',
    async (proceeding_id: number) => {
        const dataRepo = new DataRepository()
        await dataRepo.DeleteCourtProceeding(localStorage.jwt_token, proceeding_id)
    }
)

// CASE CITIZEN THUNKS
export const newCaseCitizens = createAsyncThunk(
    'data/newCaseCitizens',
    async (formData: any) => {
        const dataRepo = new DataRepository()
        await dataRepo.NewCaseCitizens(localStorage.jwt_token, formData)
    }
)

export const newClusterList = createAsyncThunk(
    'data/newClusterList',
    async (caseStatus: string = 'all') => {
        const dataRepo = new DataRepository()
        const res = await dataRepo.NewClusterList(localStorage.jwt_token, caseStatus)
        let activeCasesCount = 0 
        let closedCasesCount = 0
        
        res.map((case_: any) => {
            if (case_.is_closed === false) {
                activeCasesCount++;
            }
            else if(case_.is_closed === true) {
                closedCasesCount++;
            }
        })
        
        console.log("Active: ", activeCasesCount)
        console.log("Closed: ", closedCasesCount)
        return { newCluster: res, active : activeCasesCount, closed : closedCasesCount }
    }
)

export const criminalCaseCitizens = createAsyncThunk(
    'data/criminalCaseCitizens',
    async (case_id: number) => {
        const dataRepo = new DataRepository()
        return await dataRepo.CriminalCaseCitizens(localStorage.jwt_token, case_id)
    }
)

export const civilCaseCitizens = createAsyncThunk(
    'data/civilCaseCitizens',
    async (case_id: number) => {
        const dataRepo = new DataRepository()
        return await dataRepo.CivilCaseCitizens(localStorage.jwt_token, case_id)
    }
)

export const docketCaseCitizens = createAsyncThunk(
    'data/docketCaseCitizens',
    async (case_id: number) => {
        const dataRepo = new DataRepository()
        return await dataRepo.DocketCaseCitizens(localStorage.jwt_token, case_id)
    }
)

export const citizenCases = createAsyncThunk(
    'data/citizenCases',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.CitizenCases(localStorage.jwt_token)
    }
)

export const deleteCaseCitizen = createAsyncThunk(
    'data/deleteCaseCitizen',
    async (pk: number) => {
        const dataRepo = new DataRepository()
        await dataRepo.DeleteCaseCitizen(localStorage.jwt_token, pk)
    }
)

// CRIME THUNKS
export const getCrimeList = createAsyncThunk(
    'data/getCrimeList',
    async () => {
        const dataRepo = new DataRepository()
        const res = await dataRepo.CrimeList(localStorage.jwt_token)
        const criminalCrimes = res.filter((crime: any) => crime.case_type === 'Criminal')
        const civilCrimes = res.filter((crime: any) => crime.case_type === 'Civil')
        return {
            crimeList : res,
            criminalCrimeList : criminalCrimes,
            civilCrimeList : civilCrimes
        }
    }
)

export const newCrime = createAsyncThunk(
    'data/newCrime',
    async (formData: any) => {
        const dataRepo = new DataRepository()
        await dataRepo.NewCrime(localStorage.jwt_token, formData)
    }
)

export const updateCrime = createAsyncThunk(
    'data/updateCrime',
    async (args: { formData: any, crime_id: number }) => {
        const dataRepo = new DataRepository()
        await dataRepo.UpdateCrime(localStorage.jwt_token, args.formData, args.crime_id)
    }
)

export const deleteCrime = createAsyncThunk(
    'data/deleteCrime',
    async (crime_id: number) => {
        const dataRepo = new DataRepository()
        await dataRepo.DeleteCrime(localStorage.jwt_token, crime_id)
    }
)

const dataSlice = createSlice({
    name : 'data',
    initialState,
    reducers : {
        changeIsNewData : (state, action) => {
            return { ...state, isNewData : action.payload }
        },
        updateActivityLogs : (state, action) => {
            return { ...state, activityLogs : action.payload }
        }
    },
    extraReducers : builder => {
        // ACCOUNTS
        // Get User Info
        builder.addCase(getUserInfo.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, userInfo : action.payload }
        })
        builder.addCase(getUserInfo.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Staff Accounts
        builder.addCase(getStaffList.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getStaffList.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, staffList : action.payload }
        })
        builder.addCase(getStaffList.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Citizen Accounts
        builder.addCase(getCitizenList.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCitizenList.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, citizenList : action.payload }
        })
        builder.addCase(getCitizenList.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Offices Accounts
        builder.addCase(getOfficesList.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getOfficesList.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, officesList : action.payload }
        })
        builder.addCase(getOfficesList.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // PLACES
        // Get Provinces
        builder.addCase(getProvinces.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getProvinces.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, provinceList : action.payload }
        })
        builder.addCase(getProvinces.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Delete Account
        builder.addCase(deleteAccount.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(deleteAccount.fulfilled, (state) => {
            return { ...state, dataLoading : false }
        })
        builder.addCase(deleteAccount.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // DOCKET
        // Fetch Cases Summary
        builder.addCase(fetchCasesSummary.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(fetchCasesSummary.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, casesSummaryList : action.payload }
        })
        builder.addCase(fetchCasesSummary.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Fetch Crime Types Summary
        builder.addCase(fetchCrimeTypesSummary.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(fetchCrimeTypesSummary.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, crimeTypesSummaryList : action.payload }
        })
        builder.addCase(fetchCrimeTypesSummary.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get All Dockets
        builder.addCase(getAllDockets.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getAllDockets.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, allDocketList : action.payload }
        })
        builder.addCase(getAllDockets.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Current Dockets
        builder.addCase(getCurrentDockets.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCurrentDockets.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, currentDocketList : action.payload }
        })
        builder.addCase(getCurrentDockets.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Past Dockets
        builder.addCase(getPastDockets.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getPastDockets.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, pastDocketList : action.payload }
        })
        builder.addCase(getPastDockets.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Criminal Cases
        builder.addCase(getCriminalCases.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCriminalCases.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, criminalCaseList : action.payload }
        })
        builder.addCase(getCriminalCases.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Civil Cases
        builder.addCase(getCivilCases.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCivilCases.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, civilCaseList : action.payload }
        })
        builder.addCase(getCivilCases.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // COURT HEARINGS
        // Get Court Hearings
        builder.addCase(getCourtHearings.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCourtHearings.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, courtHearingList : action.payload }
        })
        builder.addCase(getCourtHearings.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Upcoming Hearings
        builder.addCase(getUpcomingHearings.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getUpcomingHearings.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, upcomingHearingList : action.payload }
        })
        builder.addCase(getUpcomingHearings.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Delete Hearing
        builder.addCase(deleteHearing.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(deleteHearing.fulfilled, (state) => {
            return { ...state, dataLoading : false }
        })
        builder.addCase(deleteHearing.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // DETAINEES
        // Get All Detainees
        builder.addCase(getAllDetainees.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getAllDetainees.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, allRecords : action.payload }
        })
        builder.addCase(getAllDetainees.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get PNP Detainees
        builder.addCase(getPNPDetainees.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getPNPDetainees.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, pnpRecords : action.payload }
        })
        builder.addCase(getPNPDetainees.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get BJMP Detainees
        builder.addCase(getBJMPDetainees.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getBJMPDetainees.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, bjmpRecords : action.payload }
        })
        builder.addCase(getBJMPDetainees.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get BuCor Detainees
        builder.addCase(getBuCorDetainees.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getBuCorDetainees.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, bucorRecords : action.payload }
        })
        builder.addCase(getBuCorDetainees.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // New Detainee
        builder.addCase(createNewDetainee.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(createNewDetainee.fulfilled, (state) => {
            return { ...state, dataLoading : false }
        })
        builder.addCase(createNewDetainee.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // TRANSFERED DOCUMENTS
        // Get Transfered Documents
        builder.addCase(getTransferedDocuments.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getTransferedDocuments.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, transferedDocuments : action.payload }
        })
        builder.addCase(getTransferedDocuments.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Document Logs
        builder.addCase(getDocumentLogs.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getDocumentLogs.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, documentLogs : action.payload }
        })
        builder.addCase(getDocumentLogs.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Office Documents
        builder.addCase(getOfficeDocuments.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getOfficeDocuments.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, officeDocuments : action.payload }
        })
        builder.addCase(getOfficeDocuments.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Recent Documents
        builder.addCase(getRecentDocuments.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getRecentDocuments.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, recentDocuments : action.payload }
        })
        builder.addCase(getRecentDocuments.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get DBScan Clustering
        builder.addCase(getClustering.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getClustering.fulfilled, (state, action) => {
            const { payload } = action
            return { 
                ...state, 
                dataLoading : false, 
                clusterList : payload.formattedCluster,
                // clusterYears : payload.formattedYears
            }
        })
        builder.addCase(getClustering.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // New Clustering List
        builder.addCase(newClusterList.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(newClusterList.fulfilled, (state, action) => {
            const { newCluster, active, closed } = action.payload
            return { ...state, dataLoading : false, newCluster : newCluster, activeCount : Number(active), closedCount : Number(closed) }
        })
        builder.addCase(newClusterList.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Cluster Cases
        builder.addCase(getClusterCases.pending, (state) => {
            return { ...state }
        })
        builder.addCase(getClusterCases.fulfilled, (state, action) => {
            return { 
                ...state, 
                clusterCases : action.payload,
            }
        })
        builder.addCase(getClusterCases.rejected, (state) => {
            return { ...state }
        })
        // Get Cluster Crimes
        builder.addCase(getClusterCrimes.pending, (state) => {
            return { ...state }
        })
        builder.addCase(getClusterCrimes.fulfilled, (state, action) => {
            return { 
                ...state, 
                clusterCrimes : action.payload,
            }
        })
        builder.addCase(getClusterCrimes.rejected, (state) => {
            return { ...state }
        })
        // COURT PROCEEDINGS
        // Get Court Proceedings
        builder.addCase(getCourtProceedings.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCourtProceedings.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, courtProceedingsList : action.payload }
        })
        builder.addCase(getCourtProceedings.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Case Proceedings
        builder.addCase(getCaseProceedings.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCaseProceedings.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, caseProceedingsList : action.payload }
        })
        builder.addCase(getCaseProceedings.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // CASE CITIZENS
        // Criminal Case Citizens
        builder.addCase(criminalCaseCitizens.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(criminalCaseCitizens.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, criminalCaseCitizensList : action.payload }
        })
        builder.addCase(criminalCaseCitizens.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Civil Case Citizens
        builder.addCase(civilCaseCitizens.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(civilCaseCitizens.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, civilCaseCitizensList : action.payload }
        })
        builder.addCase(civilCaseCitizens.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Docket Case Citizens
        builder.addCase(docketCaseCitizens.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(docketCaseCitizens.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, docketCaseCitizensList : action.payload }
        })
        builder.addCase(docketCaseCitizens.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Citizen Cases
        builder.addCase(citizenCases.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(citizenCases.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, citizenCasesList : action.payload }
        })
        builder.addCase(citizenCases.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // CRIME 
        builder.addCase(getCrimeList.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCrimeList.fulfilled, (state, action) => {
            const { crimeList, criminalCrimeList, civilCrimeList } = action.payload
            return { ...state, dataLoading : false, crimeList : crimeList, criminalCrimeList : criminalCrimeList, civilCrimeList : civilCrimeList }
        })
        builder.addCase(getCrimeList.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
    }
})

export const {
    changeIsNewData,
    updateActivityLogs
} = dataSlice.actions

export default dataSlice.reducer