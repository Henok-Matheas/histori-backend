import mongoose, { Schema, Document, Types } from "mongoose";

// Define Properties Schema
interface IProperties extends Document {
  NAME: string;
  ABBREVN?: string;
  SUBJECTO?: string;
  BORDERPRECISION?: number;
  PARTOF?: string;
}

const PropertiesSchema: Schema = new Schema({
  NAME: {
    type: String,
    // unique: true, // Ensure uniqueness of NAME
  },
  ABBREVN: {
    type: String,
  },
  SUBJECTO: {
    type: String,
  },
  BORDERPRECISION: {
    type: Number,
  },
  PARTOF: {
    type: String,
  },
});

const Properties = mongoose.model<IProperties>("Properties", PropertiesSchema);

// Define Geometry Schema
interface IGeometry extends Document {
  type: string;
  coordinates: any; // Allow flexible data type for coordinates
}

const GeometrySchema: Schema = new Schema({
  type: {
    type: String,
    default: "Polygon",
  },
  coordinates: {
    type: Schema.Types.Mixed,
  },
});

const Geometry = mongoose.model<IGeometry>("Geometry", GeometrySchema);

// Define Map Schema
interface IMap extends Document {
  startPeriod: number;
  endPeriod: number;
  properties: Types.ObjectId;
  geometry: Types.ObjectId;
}

const MapSchema: Schema = new Schema({
  type: {
    type: String,
    default: "Feature",
  },
  startPeriod: {
    type: Number,
    required: true,
  },
  endPeriod: {
    type: Number,
  },
  properties: {
    type: Schema.Types.ObjectId,
    ref: "Properties",
    required: true,
  },
  geometry: {
    type: Schema.Types.ObjectId,
    ref: "Geometry",
  },
});

interface ITempMap extends Document {
  startPeriod: number;
  endPeriod: number;
  map: any;
}

const TempMapSchema: Schema = new Schema({
  startPeriod: {
    type: Number,
    required: true,
  },
  endPeriod: {
    type: Number,
  },
  map: {
    type: Schema.Types.Mixed,
  },
});

const Map = mongoose.model<IMap>("Map", MapSchema);
const TempMap = mongoose.model<ITempMap>("TempMap", TempMapSchema);
export { Map, TempMap, Properties, Geometry };
