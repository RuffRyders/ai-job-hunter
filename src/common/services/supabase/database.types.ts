export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      education: {
        Row: {
          createdAt: string
          degreeType: string
          discipline: string | null
          endDate: string | null
          gpa: number | null
          id: string
          schoolName: string
          startDate: string | null
          userId: string
        }
        Insert: {
          createdAt?: string
          degreeType: string
          discipline?: string | null
          endDate?: string | null
          gpa?: number | null
          id?: string
          schoolName: string
          startDate?: string | null
          userId: string
        }
        Update: {
          createdAt?: string
          degreeType?: string
          discipline?: string | null
          endDate?: string | null
          gpa?: number | null
          id?: string
          schoolName?: string
          startDate?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_education_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      experience: {
        Row: {
          companyName: string | null
          createdAt: string
          description: string | null
          endDate: string | null
          id: string
          isCurrent: boolean
          jobTitle: string
          location: string | null
          startDate: string | null
          userId: string
        }
        Insert: {
          companyName?: string | null
          createdAt?: string
          description?: string | null
          endDate?: string | null
          id?: string
          isCurrent?: boolean
          jobTitle: string
          location?: string | null
          startDate?: string | null
          userId: string
        }
        Update: {
          companyName?: string | null
          createdAt?: string
          description?: string | null
          endDate?: string | null
          id?: string
          isCurrent?: boolean
          jobTitle?: string
          location?: string | null
          startDate?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_experience_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      jobApplications: {
        Row: {
          applicationStatus: Database["public"]["Enums"]["jobApplicationStatus"]
          archivedAt: string | null
          archivedReason:
            | Database["public"]["Enums"]["jobApplicationArchivedReason"]
            | null
          companyLogoUrl: string | null
          companyName: string
          coverLetter: string | null
          createdAt: string
          id: string
          jobDescription: string | null
          jobTitle: string
          jobUrl: string | null
          notes: string | null
          rank: string | null
          salaryMax: number | null
          salaryMin: number | null
          updatedAt: string | null
          userId: string
        }
        Insert: {
          applicationStatus?: Database["public"]["Enums"]["jobApplicationStatus"]
          archivedAt?: string | null
          archivedReason?:
            | Database["public"]["Enums"]["jobApplicationArchivedReason"]
            | null
          companyLogoUrl?: string | null
          companyName: string
          coverLetter?: string | null
          createdAt?: string
          id?: string
          jobDescription?: string | null
          jobTitle: string
          jobUrl?: string | null
          notes?: string | null
          rank?: string | null
          salaryMax?: number | null
          salaryMin?: number | null
          updatedAt?: string | null
          userId?: string
        }
        Update: {
          applicationStatus?: Database["public"]["Enums"]["jobApplicationStatus"]
          archivedAt?: string | null
          archivedReason?:
            | Database["public"]["Enums"]["jobApplicationArchivedReason"]
            | null
          companyLogoUrl?: string | null
          companyName?: string
          coverLetter?: string | null
          createdAt?: string
          id?: string
          jobDescription?: string | null
          jobTitle?: string
          jobUrl?: string | null
          notes?: string | null
          rank?: string | null
          salaryMax?: number | null
          salaryMin?: number | null
          updatedAt?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_jobApplications_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          createdAt: string
          id: string
          name: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          name: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_skills_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatarUrl: string | null
          createdAt: string
          email: string | null
          firstName: string | null
          id: string
          lastName: string | null
          location: string | null
          phoneNumber: string | null
        }
        Insert: {
          avatarUrl?: string | null
          createdAt?: string
          email?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
          location?: string | null
          phoneNumber?: string | null
        }
        Update: {
          avatarUrl?: string | null
          createdAt?: string
          email?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
          location?: string | null
          phoneNumber?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      jobApplicationArchivedReason:
        | "REJECTED"
        | "ACCEPTED"
        | "GHOSTED"
        | "CLOSED"
        | "WITHDRAWN"
      jobApplicationStatus:
        | "NOT_APPLIED"
        | "APPLIED"
        | "INTERVIEWING"
        | "OFFER_PENDING"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
