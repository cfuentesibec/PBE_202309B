function logearInfo(request, response, next) {
    const m = request.method;
    const t = Date.now();
    const p = request.params;
    const q = request.query;
    console.log(`Datos de solicitud:
Metodo: ${m}
Fecha: ${t}
Parametros: ${p}
Query Params: ${q}
`);
    next();
}

function validacionesComunes(req, res, next) {
    if (req.params.indice && req.params.indice < 0) {
        res.status(400).send("Indice inválido");
        return;
    }

    next();
}

function middleware2(req, res, next) {
    console.log("middleware 2");
    next();
}

module.exports = {
    logearInfo,
    middleware2,
    validacionesComunes,
}