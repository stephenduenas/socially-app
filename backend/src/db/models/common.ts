const TIMESTAMPS = {
  CreatedAt: 'created_at',
  UpdatedAt: 'updated_at',
} as const;

const RULES = {
  Cascade: 'CASCADE',
  Null: 'SET NULL',
} as const;

export type TimestampsColumnName = (typeof TIMESTAMPS)[keyof typeof TIMESTAMPS];

export interface ITimestamps {
  created_at: string;
  updated_at: string;
}

export const Common = { Timestamps: TIMESTAMPS, Rules: RULES };
