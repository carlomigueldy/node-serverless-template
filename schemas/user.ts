import mongoose, { Document, Types } from "mongoose";

export interface Item {
  key: string;
  count: number;
}

export interface QuestProgress {
  id: number;
  progress: number;
  completed: boolean;
}

export interface UserDocument extends Document<Types.ObjectId> {
  address: string;
  username: string;
  name: string;
  email?: string | undefined;
  spawnWorld: string;
  spawnPoint: string;
  keyItems?: string[];
  items?: Item[];
  badges?: string[];
  blocked?: string[];
  blockedBy?: string[];
  quests?: [
    {
      id: number;
      progress: QuestProgress[];
      completed: boolean;
      claimed: boolean;
    }
  ];
  /**
   * multi wallet support
   */
  wallets: {
    [address: string]: {
      created_at: Date | number | string;
      updated_at: Date | number | string;
      deleted_at?: Date | number | string;
      last_signed_at?: Date | number | string;
    };
  };
  /**
   * multi oauth provider support
   */
  oauth: {
    [oauthProvider: string]: {
      [key: string]: any;
      userId?: number | string | undefined;
    };
  };
}

const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: false,
  },

  username: String,

  name: String,

  spawnPoint: String,
  spawnWorld: String,

  keyItems: [String],
  badges: [String],
  items: [{ key: String, count: Number }],

  blocked: { type: [String], required: false },
  blockedBy: { type: [String], required: false },

  quests: [
    {
      id: Number,
      progress: [{ id: Number, progress: Number, completed: Boolean }],
      completed: Boolean,
      claimed: Boolean,
    },
  ],

  /**
   * multi wallet support
   */
  wallets: {
    type: Map,
    of: new mongoose.Schema(
      {
        created_at: {
          type: Date,
          required: true,
        },
        updated_at: {
          type: Date,
          required: true,
        },
        deleted_at: {
          type: Date,
          required: false,
          default: null,
        },
        last_signed_at: {
          type: Date,
          required: false,
          default: null,
        },
      },
      {
        _id: false,
      }
    ),
  },
  /**
   * multi oauth provider support
   */
  oauth: {
    type: Map,
    of: new mongoose.Schema(
      {
        Name: { type: String },
        Text: { type: String },
      },
      {
        strict: false,
        _id: false,
      }
    ),
  },
});

export default mongoose.model("users", UserSchema);
