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
      api_keys: {
        Row: {
          created_at: string | null
          id: string
          key: string
          name: string
          service: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          name: string
          service: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          name?: string
          service?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          published: boolean | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      pg_all_foreign_keys: {
        Row: {
          fk_columns: unknown[] | null
          fk_constraint_name: unknown | null
          fk_schema_name: unknown | null
          fk_table_name: unknown | null
          fk_table_oid: unknown | null
          is_deferrable: boolean | null
          is_deferred: boolean | null
          match_type: string | null
          on_delete: string | null
          on_update: string | null
          pk_columns: unknown[] | null
          pk_constraint_name: unknown | null
          pk_index_name: unknown | null
          pk_schema_name: unknown | null
          pk_table_name: unknown | null
          pk_table_oid: unknown | null
        }
        Relationships: []
      }
      tap_funky: {
        Row: {
          args: string | null
          is_definer: boolean | null
          is_strict: boolean | null
          is_visible: boolean | null
          kind: unknown | null
          langoid: unknown | null
          name: unknown | null
          oid: unknown | null
          owner: unknown | null
          returns: string | null
          returns_set: boolean | null
          schema: unknown | null
          volatility: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _cleanup: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      _contract_on: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      _currtest: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      _db_privs: {
        Args: Record<PropertyKey, never>
        Returns: unknown[]
      }
      _definer: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _dexists: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _expand_context: {
        Args: {
          "": string
        }
        Returns: string
      }
      _expand_on: {
        Args: {
          "": string
        }
        Returns: string
      }
      _expand_vol: {
        Args: {
          "": string
        }
        Returns: string
      }
      _ext_exists: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _extensions:
        | {
            Args: Record<PropertyKey, never>
            Returns: unknown[]
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown[]
          }
      _funkargs: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      _get: {
        Args: {
          "": string
        }
        Returns: number
      }
      _get_db_owner: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _get_dtype: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      _get_language_owner: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _get_latest: {
        Args: {
          "": string
        }
        Returns: number[]
      }
      _get_note:
        | {
            Args: {
              "": number
            }
            Returns: string
          }
        | {
            Args: {
              "": string
            }
            Returns: string
          }
      _get_opclass_owner: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _get_rel_owner: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _get_schema_owner: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _get_tablespace_owner: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _get_type_owner: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _got_func: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _grolist: {
        Args: {
          "": unknown
        }
        Returns: unknown[]
      }
      _has_group: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _has_role: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _has_user: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _inherited: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _is_schema: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _is_super: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _is_trusted: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _is_verbose: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      _lang: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _opc_exists: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _parts: {
        Args: {
          "": unknown
        }
        Returns: unknown[]
      }
      _pg_sv_type_array: {
        Args: {
          "": unknown[]
        }
        Returns: unknown[]
      }
      _prokind: {
        Args: {
          p_oid: unknown
        }
        Returns: unknown
      }
      _query: {
        Args: {
          "": string
        }
        Returns: string
      }
      _refine_vol: {
        Args: {
          "": string
        }
        Returns: string
      }
      _relexists: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _returns: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      _strict: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      _table_privs: {
        Args: Record<PropertyKey, never>
        Returns: unknown[]
      }
      _temptypes: {
        Args: {
          "": string
        }
        Returns: string
      }
      _todo: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _vol: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      can: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      casts_are: {
        Args: {
          "": string[]
        }
        Returns: string
      }
      col_is_null:
        | {
            Args: {
              schema_name: unknown
              table_name: unknown
              column_name: unknown
              description?: string
            }
            Returns: string
          }
        | {
            Args: {
              table_name: unknown
              column_name: unknown
              description?: string
            }
            Returns: string
          }
      col_not_null:
        | {
            Args: {
              schema_name: unknown
              table_name: unknown
              column_name: unknown
              description?: string
            }
            Returns: string
          }
        | {
            Args: {
              table_name: unknown
              column_name: unknown
              description?: string
            }
            Returns: string
          }
      collect_tap:
        | {
            Args: Record<PropertyKey, never>
            Returns: string
          }
        | {
            Args: {
              "": string[]
            }
            Returns: string
          }
      diag:
        | {
            Args: Record<PropertyKey, never>
            Returns: string
          }
        | {
            Args: Record<PropertyKey, never>
            Returns: string
          }
        | {
            Args: {
              msg: string
            }
            Returns: string
          }
        | {
            Args: {
              msg: unknown
            }
            Returns: string
          }
      diag_test_name: {
        Args: {
          "": string
        }
        Returns: string
      }
      do_tap:
        | {
            Args: Record<PropertyKey, never>
            Returns: string[]
          }
        | {
            Args: {
              "": string
            }
            Returns: string[]
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string[]
          }
      domains_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      enums_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      extensions_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      fail:
        | {
            Args: Record<PropertyKey, never>
            Returns: string
          }
        | {
            Args: {
              "": string
            }
            Returns: string
          }
      findfuncs: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      finish: {
        Args: {
          exception_on_failure?: boolean
        }
        Returns: string[]
      }
      foreign_tables_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      functions_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      groups_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      has_check: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_composite: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_domain: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_enum: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_extension: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_fk: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_foreign_table: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_function: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_group: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_inherited_tables: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_language: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_materialized_view: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_opclass: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_pk: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_relation: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_role: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_schema: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_sequence: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_table: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_tablespace: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_type: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_unique: {
        Args: {
          "": string
        }
        Returns: string
      }
      has_user: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      has_view: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_composite: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_domain: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_enum: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_extension: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_fk: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_foreign_table: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_function: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_group: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_inherited_tables: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_language: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_materialized_view: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_opclass: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_pk: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_relation: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_role: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_schema: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_sequence: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_table: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_tablespace: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_type: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_user: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hasnt_view: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      in_todo: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      index_is_primary: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      index_is_unique: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      is_aggregate: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      is_clustered: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      is_definer: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      is_empty: {
        Args: {
          "": string
        }
        Returns: string
      }
      is_normal_function: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      is_partitioned: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      is_procedure: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      is_strict: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      is_superuser: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      is_valid_email: {
        Args: {
          email: string
        }
        Returns: boolean
      }
      is_window: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      isnt_aggregate: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      isnt_definer: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      isnt_empty: {
        Args: {
          "": string
        }
        Returns: string
      }
      isnt_normal_function: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      isnt_partitioned: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      isnt_procedure: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      isnt_strict: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      isnt_superuser: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      isnt_window: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      language_is_trusted: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      languages_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      lives_ok: {
        Args: {
          "": string
        }
        Returns: string
      }
      materialized_views_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      no_plan: {
        Args: Record<PropertyKey, never>
        Returns: boolean[]
      }
      num_failed: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      ok: {
        Args: {
          "": boolean
        }
        Returns: string
      }
      opclasses_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      operators_are: {
        Args: {
          "": string[]
        }
        Returns: string
      }
      os_name: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      pass:
        | {
            Args: Record<PropertyKey, never>
            Returns: string
          }
        | {
            Args: {
              "": string
            }
            Returns: string
          }
      pg_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      pg_version_num: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      pgtap_version: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      plan: {
        Args: {
          "": number
        }
        Returns: string
      }
      roles_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      runtests:
        | {
            Args: Record<PropertyKey, never>
            Returns: string[]
          }
        | {
            Args: {
              "": string
            }
            Returns: string[]
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string[]
          }
      schemas_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      sequences_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      skip:
        | {
            Args: {
              "": number
            }
            Returns: string
          }
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              why: string
              how_many: number
            }
            Returns: string
          }
      tables_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      tablespaces_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      throws_ok: {
        Args: {
          "": string
        }
        Returns: string
      }
      todo:
        | {
            Args: {
              how_many: number
            }
            Returns: boolean[]
          }
        | {
            Args: {
              how_many: number
              why: string
            }
            Returns: boolean[]
          }
        | {
            Args: {
              why: string
            }
            Returns: boolean[]
          }
        | {
            Args: {
              why: string
              how_many: number
            }
            Returns: boolean[]
          }
      todo_end: {
        Args: Record<PropertyKey, never>
        Returns: boolean[]
      }
      todo_start:
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean[]
          }
        | {
            Args: {
              "": string
            }
            Returns: boolean[]
          }
      types_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      users_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
      views_are: {
        Args: {
          "": unknown[]
        }
        Returns: string
      }
    }
    Enums: {
      payment_status: "pending" | "completed" | "failed" | "refunded"
      subscription_status: "trial" | "active" | "cancelled" | "expired"
      user_status: "active" | "inactive" | "pending"
    }
    CompositeTypes: {
      _time_trial_type: {
        a_time: number | null
      }
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
