export const getErrMessageFromObj = (message) => {
    if (typeof(message)==='string') return message;
    return message[0];
}