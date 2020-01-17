import initCACCL from 'caccl/client/cached';

const { sendRequest } = initCACCL();

/**
 * Write a log to the database
 * @param {string} type - the type of the log entry
 * @param {object} data - the data to attach to the entry
 */
export default (type, data) => {
  sendRequest({
    path: '/log',
    method: 'POST',
    params: {
      type,
      data,
    },
  });
};
