export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      blinks_pendientes: {
        Row: {
          created_at: string
          destinatario_wa: string
          estado: string
          id: string
          monto: number
          suscripcion_id: string | null
          tx_signature: string | null
          url_blink: string | null
        }
        Insert: {
          created_at?: string
          destinatario_wa: string
          estado?: string
          id?: string
          monto: number
          suscripcion_id?: string | null
          tx_signature?: string | null
          url_blink?: string | null
        }
        Update: {
          created_at?: string
          destinatario_wa?: string
          estado?: string
          id?: string
          monto?: number
          suscripcion_id?: string | null
          tx_signature?: string | null
          url_blink?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blinks_pendientes_suscripcion_id_fkey"
            columns: ["suscripcion_id"]
            isOneToOne: false
            referencedRelation: "suscripciones"
            referencedColumns: ["id"]
          },
        ]
      }
      cashback_programa: {
        Row: {
          created_at: string
          id: string
          porcentaje_nivel1: number
          porcentaje_nivel2: number
        }
        Insert: {
          created_at?: string
          id?: string
          porcentaje_nivel1?: number
          porcentaje_nivel2?: number
        }
        Update: {
          created_at?: string
          id?: string
          porcentaje_nivel1?: number
          porcentaje_nivel2?: number
        }
        Relationships: []
      }
      cashback_referidos: {
        Row: {
          codigo: string
          created_at: string
          id: string
          referido_wa: string
          referidor_wa: string
        }
        Insert: {
          codigo: string
          created_at?: string
          id?: string
          referido_wa: string
          referidor_wa: string
        }
        Update: {
          codigo?: string
          created_at?: string
          id?: string
          referido_wa?: string
          referidor_wa?: string
        }
        Relationships: []
      }
      cashback_transacciones: {
        Row: {
          created_at: string
          id: string
          monto: number
          nivel: number | null
          referido_wa: string | null
          suscripcion_id: string | null
          tipo: string
          usuario_wa: string
        }
        Insert: {
          created_at?: string
          id?: string
          monto: number
          nivel?: number | null
          referido_wa?: string | null
          suscripcion_id?: string | null
          tipo: string
          usuario_wa: string
        }
        Update: {
          created_at?: string
          id?: string
          monto?: number
          nivel?: number | null
          referido_wa?: string | null
          suscripcion_id?: string | null
          tipo?: string
          usuario_wa?: string
        }
        Relationships: [
          {
            foreignKeyName: "cashback_transacciones_suscripcion_id_fkey"
            columns: ["suscripcion_id"]
            isOneToOne: false
            referencedRelation: "suscripciones"
            referencedColumns: ["id"]
          },
        ]
      }
      suscripciones: {
        Row: {
          activa: boolean
          created_at: string
          destinatario_solana: string | null
          destinatario_wa: string
          frecuencia: string
          id: string
          monto: number
          pda_address: string | null
          proximo_pago: string
          remitente_wa: string
          ultimo_pago: string | null
          updated_at: string
        }
        Insert: {
          activa?: boolean
          created_at?: string
          destinatario_solana?: string | null
          destinatario_wa: string
          frecuencia: string
          id?: string
          monto: number
          pda_address?: string | null
          proximo_pago: string
          remitente_wa: string
          ultimo_pago?: string | null
          updated_at?: string
        }
        Update: {
          activa?: boolean
          created_at?: string
          destinatario_solana?: string | null
          destinatario_wa?: string
          frecuencia?: string
          id?: string
          monto?: number
          pda_address?: string | null
          proximo_pago?: string
          remitente_wa?: string
          ultimo_pago?: string | null
          updated_at?: string
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
