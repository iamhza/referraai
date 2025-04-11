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
      dhs_providers: {
        Row: {
          accessibility_features: string[] | null
          addressline1: string | null
          addressline2: string | null
          age_groups_served: string[] | null
          application: string | null
          areaserved: string | null
          city: string | null
          counties_served: string[] | null
          county: string | null
          eligibility: string | null
          emailaddress: string | null
          features: string | null
          fee: string | null
          fulldescription: string | null
          gender_specific: string | null
          hours_of_operation: string | null
          id: number
          insurance_accepted: string[] | null
          languages_spoken: string[] | null
          locationname: string | null
          modifydate: string | null
          owner_id: string | null
          phonenumber: string | null
          provider_creation_date: string | null
          provider_size: string | null
          providername: string | null
          providerservicedescription: string | null
          service_type: string[] | null
          servicename: string | null
          shortdescription: string | null
          state: string | null
          transportation_provided: boolean | null
          website: string | null
          zipcode: string | null
        }
        Insert: {
          accessibility_features?: string[] | null
          addressline1?: string | null
          addressline2?: string | null
          age_groups_served?: string[] | null
          application?: string | null
          areaserved?: string | null
          city?: string | null
          counties_served?: string[] | null
          county?: string | null
          eligibility?: string | null
          emailaddress?: string | null
          features?: string | null
          fee?: string | null
          fulldescription?: string | null
          gender_specific?: string | null
          hours_of_operation?: string | null
          id: number
          insurance_accepted?: string[] | null
          languages_spoken?: string[] | null
          locationname?: string | null
          modifydate?: string | null
          owner_id?: string | null
          phonenumber?: string | null
          provider_creation_date?: string | null
          provider_size?: string | null
          providername?: string | null
          providerservicedescription?: string | null
          service_type?: string[] | null
          servicename?: string | null
          shortdescription?: string | null
          state?: string | null
          transportation_provided?: boolean | null
          website?: string | null
          zipcode?: string | null
        }
        Update: {
          accessibility_features?: string[] | null
          addressline1?: string | null
          addressline2?: string | null
          age_groups_served?: string[] | null
          application?: string | null
          areaserved?: string | null
          city?: string | null
          counties_served?: string[] | null
          county?: string | null
          eligibility?: string | null
          emailaddress?: string | null
          features?: string | null
          fee?: string | null
          fulldescription?: string | null
          gender_specific?: string | null
          hours_of_operation?: string | null
          id?: number
          insurance_accepted?: string[] | null
          languages_spoken?: string[] | null
          locationname?: string | null
          modifydate?: string | null
          owner_id?: string | null
          phonenumber?: string | null
          provider_creation_date?: string | null
          provider_size?: string | null
          providername?: string | null
          providerservicedescription?: string | null
          service_type?: string[] | null
          servicename?: string | null
          shortdescription?: string | null
          state?: string | null
          transportation_provided?: boolean | null
          website?: string | null
          zipcode?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          recipient_id: string | null
          referral_id: number
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id?: string | null
          referral_id: number
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id?: string | null
          referral_id?: number
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_referral"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_services: {
        Row: {
          areas_served: string | null
          created_at: string | null
          features: string | null
          full_description: string | null
          id: string
          provider_id: string
          service_id: string
          short_description: string | null
          subscription_status: string | null
          updated_at: string | null
        }
        Insert: {
          areas_served?: string | null
          created_at?: string | null
          features?: string | null
          full_description?: string | null
          id?: string
          provider_id: string
          service_id: string
          short_description?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Update: {
          areas_served?: string | null
          created_at?: string | null
          features?: string | null
          full_description?: string | null
          id?: string
          provider_id?: string
          service_id?: string
          short_description?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["service_id"]
          },
        ]
      }
      providers: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          county: string | null
          created_at: string | null
          email_address: string | null
          id: string
          location_name: string | null
          owner_id: string | null
          phone_number: string | null
          provider_name: string
          state: string | null
          updated_at: string | null
          website: string | null
          zipcode: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          county?: string | null
          created_at?: string | null
          email_address?: string | null
          id?: string
          location_name?: string | null
          owner_id?: string | null
          phone_number?: string | null
          provider_name: string
          state?: string | null
          updated_at?: string | null
          website?: string | null
          zipcode?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          county?: string | null
          created_at?: string | null
          email_address?: string | null
          id?: string
          location_name?: string | null
          owner_id?: string | null
          phone_number?: string | null
          provider_name?: string
          state?: string | null
          updated_at?: string | null
          website?: string | null
          zipcode?: string | null
        }
        Relationships: []
      }
      raw_provider_data: {
        Row: {
          addressline1: string | null
          addressline2: string | null
          application: string | null
          areaserved: string | null
          city: string | null
          county: string | null
          eligibility: string | null
          emailaddress: string | null
          features: string | null
          fee: string | null
          fts: unknown | null
          fulldescription: string | null
          id: number
          locationname: string | null
          modifydate: string | null
          phonenumber: string | null
          provider_creation_date: string | null
          providername: string
          providerservicedescription: string | null
          servicename: string
          shortdescription: string | null
          state: string | null
          website: string | null
          zipcode: string | null
        }
        Insert: {
          addressline1?: string | null
          addressline2?: string | null
          application?: string | null
          areaserved?: string | null
          city?: string | null
          county?: string | null
          eligibility?: string | null
          emailaddress?: string | null
          features?: string | null
          fee?: string | null
          fts?: unknown | null
          fulldescription?: string | null
          id?: number
          locationname?: string | null
          modifydate?: string | null
          phonenumber?: string | null
          provider_creation_date?: string | null
          providername: string
          providerservicedescription?: string | null
          servicename: string
          shortdescription?: string | null
          state?: string | null
          website?: string | null
          zipcode?: string | null
        }
        Update: {
          addressline1?: string | null
          addressline2?: string | null
          application?: string | null
          areaserved?: string | null
          city?: string | null
          county?: string | null
          eligibility?: string | null
          emailaddress?: string | null
          features?: string | null
          fee?: string | null
          fts?: unknown | null
          fulldescription?: string | null
          id?: number
          locationname?: string | null
          modifydate?: string | null
          phonenumber?: string | null
          provider_creation_date?: string | null
          providername?: string
          providerservicedescription?: string | null
          servicename?: string
          shortdescription?: string | null
          state?: string | null
          website?: string | null
          zipcode?: string | null
        }
        Relationships: []
      }
      referral_matches: {
        Row: {
          created_at: string | null
          dhs_provider_id: number | null
          id: number
          is_selected: boolean | null
          referral_id: number | null
          response: string | null
        }
        Insert: {
          created_at?: string | null
          dhs_provider_id?: number | null
          id?: number
          is_selected?: boolean | null
          referral_id?: number | null
          response?: string | null
        }
        Update: {
          created_at?: string | null
          dhs_provider_id?: number | null
          id?: number
          is_selected?: boolean | null
          referral_id?: number | null
          response?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_matches_dhs_provider_id_fkey"
            columns: ["dhs_provider_id"]
            isOneToOne: false
            referencedRelation: "dhs_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_matches_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          accessibility_needs: string[] | null
          additional_notes: string | null
          case_manager_id: string | null
          counties: string[]
          created_at: string | null
          id: number
          insurance_required: string[] | null
          languages_required: string[] | null
          provider_size_preference: string | null
          service_type: string
          status: string | null
          urgency: string | null
        }
        Insert: {
          accessibility_needs?: string[] | null
          additional_notes?: string | null
          case_manager_id?: string | null
          counties: string[]
          created_at?: string | null
          id?: number
          insurance_required?: string[] | null
          languages_required?: string[] | null
          provider_size_preference?: string | null
          service_type: string
          status?: string | null
          urgency?: string | null
        }
        Update: {
          accessibility_needs?: string[] | null
          additional_notes?: string | null
          case_manager_id?: string | null
          counties?: string[]
          created_at?: string | null
          id?: number
          insurance_required?: string[] | null
          languages_required?: string[] | null
          provider_size_preference?: string | null
          service_type?: string
          status?: string | null
          urgency?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          name: string
          service_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          name: string
          service_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          name?: string
          service_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email_notifications: boolean | null
          full_name: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          organization_name: string | null
          organization_role: string | null
          phone_number: string | null
          profile_completed: boolean | null
          provider_id: string | null
          role: string
          sms_notifications: boolean | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email_notifications?: boolean | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          metadata?: Json | null
          organization_name?: string | null
          organization_role?: string | null
          phone_number?: string | null
          profile_completed?: boolean | null
          provider_id?: string | null
          role: string
          sms_notifications?: boolean | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email_notifications?: boolean | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          organization_name?: string | null
          organization_role?: string | null
          phone_number?: string | null
          profile_completed?: boolean | null
          provider_id?: string | null
          role?: string
          sms_notifications?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_search_vector: {
        Args: {
          providername: string
          servicename: string
          city: string
          county: string
          features: string
          fulldescription: string
          providerservicedescription: string
          shortdescription: string
          eligibility: string
          areaserved: string
        }
        Returns: unknown
      }
      get_distinct_services: {
        Args: Record<PropertyKey, never>
        Returns: {
          servicename: string
        }[]
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      is_profile_owner: {
        Args: { profile_id: string }
        Returns: boolean
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      update_user_profile: {
        Args: { user_id: string; profile_data: Json }
        Returns: Json
      }
    }
    Enums: {
      match_response_type: "pending" | "accepted" | "declined"
      referral_status_type:
        | "pending"
        | "matched"
        | "active"
        | "completed"
        | "rejected"
      referral_urgency_type: "low" | "medium" | "high"
      user_role_type: "case_manager" | "provider" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      match_response_type: ["pending", "accepted", "declined"],
      referral_status_type: [
        "pending",
        "matched",
        "active",
        "completed",
        "rejected",
      ],
      referral_urgency_type: ["low", "medium", "high"],
      user_role_type: ["case_manager", "provider", "admin"],
    },
  },
} as const
