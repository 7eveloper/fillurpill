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
      hfood: {
        Row: {
          caution: string | null
          company: string | null
          expiration_date: string | null
          function: string | null
          id: number
          image: string | null
          link: string | null
          name: string | null
          raw_materials: string | null
          standard: string | null
          sungsang: string | null
          taking_guide: string | null
        }
        Insert: {
          caution?: string | null
          company?: string | null
          expiration_date?: string | null
          function?: string | null
          id: number
          image?: string | null
          link?: string | null
          name?: string | null
          raw_materials?: string | null
          standard?: string | null
          sungsang?: string | null
          taking_guide?: string | null
        }
        Update: {
          caution?: string | null
          company?: string | null
          expiration_date?: string | null
          function?: string | null
          id?: number
          image?: string | null
          link?: string | null
          name?: string | null
          raw_materials?: string | null
          standard?: string | null
          sungsang?: string | null
          taking_guide?: string | null
        }
        Relationships: []
      }
      intake: {
        Row: {
          contents: string | null
          end: string | null
          id: string
          start: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          contents?: string | null
          end?: string | null
          id: string
          start?: string | null
          title?: string | null
          user_id?: string
        }
        Update: {
          contents?: string | null
          end?: string | null
          id?: string
          start?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string | null
          id: string
          image: string | null
          ingredient: string | null
          rating: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          id?: string
          image?: string | null
          ingredient?: string | null
          rating?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          id?: string
          image?: string | null
          ingredient?: string | null
          rating?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      product: {
        Row: {
          caution: string | null
          color: string | null
          company: string | null
          composition: string | null
          expiration_date: string | null
          function: string | null
          id: string
          image: string | null
          name: string | null
          registration_date: number | null
          storage_guide: string | null
          taking_guide: string | null
        }
        Insert: {
          caution?: string | null
          color?: string | null
          company?: string | null
          composition?: string | null
          expiration_date?: string | null
          function?: string | null
          id?: string
          image?: string | null
          name?: string | null
          registration_date?: number | null
          storage_guide?: string | null
          taking_guide?: string | null
        }
        Update: {
          caution?: string | null
          color?: string | null
          company?: string | null
          composition?: string | null
          expiration_date?: string | null
          function?: string | null
          id?: string
          image?: string | null
          name?: string | null
          registration_date?: number | null
          storage_guide?: string | null
          taking_guide?: string | null
        }
        Relationships: []
      }
      survey: {
        Row: {
          age: string | null
          created_at: string
          email: string | null
          gender: string | null
          height: string | null
          nickname: string
          user_id: string
          weight: string | null
        }
        Insert: {
          age?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          height?: string | null
          nickname?: string
          user_id?: string
          weight?: string | null
        }
        Update: {
          age?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          height?: string | null
          nickname?: string
          user_id?: string
          weight?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          nickname: string | null
          user_id: string
        }
        Insert: {
          email?: string | null
          nickname?: string | null
          user_id: string
        }
        Update: {
          email?: string | null
          nickname?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
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
