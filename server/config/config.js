// config puerto
process.env.PORT = process.env.PORT || 3000;

// entorno

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/cafe";
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.urlDB = urlDB;

// vencimiento del token

process.env.caducidad = 60 * 60 * 24 * 30;

// SEED del token

process.env.SEED = process.env.SEED || "firma-local";
