exports.ok = (Response, message, values) => {
    let data = {
        'status': 200,
        'message': message,
        'data': values
    }
    Response.json(data)
    Response.end()
}

exports.created = (Response, message, values) => {
    let data = {
        'status': 201,
        'message': message,
        'data': values
    }
    Response.status(201);
    Response.end(Response.json(data));
}

exports.badRequest = (Response, message) => {
    let data = {
        'status': 400,
        'message': message
    }
    Response.status(400);
    Response.end(Response.json(data));
}

exports.unauthorized = (Response, message) => {
    let data = {
        'status': 401,
        'message': message
    }
    Response.status(401);
    Response.end(Response.json(data));
}

exports.forbidden = (Response, message) => {
    let data = {
        'status': 403,
        'message': message
    }
    Response.status(403);
    Response.end(Response.json(data));
}

exports.notFound = (Response, message) => {
    let data = {
        'status': 404,
        'message': message
    }
    Response.status(404);
    Response.end(Response.json(data));
}

exports.serverError = (Response, message) => {
    let data = {
        'status': 500,
        'message': message
    }
    Response.status(500);
    Response.end(Response.json(data));
}