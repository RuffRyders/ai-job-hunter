import { Database } from '@/common/services/supabase/database.types'

type DB = Database['public']
type Tables = DB['Tables']
type Enums = DB['Enums']

// Enums
export type ApplicationStatus = Enums['jobApplicationStatus']
export type ArchivedReason = Enums['jobApplicationArchivedReason']

// Tables
export type JobModel = Tables['jobApplications']['Row']
export type UsersModel = Tables['users']['Row']
