/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    Id:{ type:Number, required: true, unique:true },
    Name: { type: String, required: true },
    Latitude: { type: Number },
    Longitude: { type: Number },
    Region: { type: String },
    Country: { type: String },
    Timezone: { type: String },
    Temp_c: { type: Number },
    Wind_kph: { type: Number },
    Wind_degree: { type: Number },
    Wind_dir: { type: String },
    Pressure_mb: { type: Number },
    Precip_mm: { type: Number },
    Humidity: { type: Number },
    Cloud: { type: Number },
    Feelslike_c: { type: Number },
    Vis_km: { type: Number },
    Uv: { type: Number },
    Last_updated: { type: String}
});

const Location = mongoose.model('weatherlocation', LocationSchema);

module.exports = {Location};
