exports.successResponse = (
    data,
    message = 'Operación exitosa'
) => {

    return {
        success: true,
        message,
        data
    };
};

exports.errorResponse = (
    message = 'Error interno'
) => {

    return {
        success: false,
        message
    };
};