export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      ads: {
        Row: {
          campaign_id: string
          created_at: string
          descriptions: string[]
          final_url: string
          headlines: string[]
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          descriptions: string[]
          final_url: string
          headlines: string[]
          id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          descriptions?: string[]
          final_url?: string
          headlines?: string[]
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget_amount: number | null
          created_at: string
          id: string
          name: string
          phone_number: string | null
          start_date: string | null
          status: string
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          budget_amount?: number | null
          created_at?: string
          id?: string
          name: string
          phone_number?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          budget_amount?: number | null
          created_at?: string
          id?: string
          name?: string
          phone_number?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      keywords: {
        Row: {
          bid_amount: number | null
          campaign_id: string
          competition: string | null
          created_at: string
          id: string
          match_type: string
          search_volume: number | null
          text: string
          updated_at: string
        }
        Insert: {
          bid_amount?: number | null
          campaign_id: string
          competition?: string | null
          created_at?: string
          id?: string
          match_type?: string
          search_volume?: number | null
          text: string
          updated_at?: string
        }
        Update: {
          bid_amount?: number | null
          campaign_id?: string
          competition?: string | null
          created_at?: string
          id?: string
          match_type?: string
          search_volume?: number | null
          text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "keywords_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          calls: number | null
          campaign_id: string
          clicks: number | null
          conversions: number | null
          cost: number | null
          created_at: string
          date: string
          id: string
          impressions: number | null
          updated_at: string
        }
        Insert: {
          calls?: number | null
          campaign_id: string
          clicks?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string
          date: string
          id?: string
          impressions?: number | null
          updated_at?: string
        }
        Update: {
          calls?: number | null
          campaign_id?: string
          clicks?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string
          date?: string
          id?: string
          impressions?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          business_goals: string[] | null
          business_name: string
          created_at: string
          id: string
          industry: string
          owner_name: string
          phone: string | null
          target_age_max: number | null
          target_age_min: number | null
          target_audience: string[] | null
          target_radius: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          business_goals?: string[] | null
          business_name: string
          created_at?: string
          id?: string
          industry: string
          owner_name: string
          phone?: string | null
          target_age_max?: number | null
          target_age_min?: number | null
          target_audience?: string[] | null
          target_radius?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          business_goals?: string[] | null
          business_name?: string
          created_at?: string
          id?: string
          industry?: string
          owner_name?: string
          phone?: string | null
          target_age_max?: number | null
          target_age_min?: number | null
          target_audience?: string[] | null
          target_radius?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: string
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      targeting_settings: {
        Row: {
          age_max: number | null
          age_min: number | null
          campaign_id: string
          created_at: string
          genders: string[] | null
          id: string
          locations: string[] | null
          radius: number | null
          schedule: Json | null
          updated_at: string
        }
        Insert: {
          age_max?: number | null
          age_min?: number | null
          campaign_id: string
          created_at?: string
          genders?: string[] | null
          id?: string
          locations?: string[] | null
          radius?: number | null
          schedule?: Json | null
          updated_at?: string
        }
        Update: {
          age_max?: number | null
          age_min?: number | null
          campaign_id?: string
          created_at?: string
          genders?: string[] | null
          id?: string
          locations?: string[] | null
          radius?: number | null
          schedule?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "targeting_settings_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
