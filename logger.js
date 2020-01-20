/*eslint no-console: 0*/

const uuid = require('uuid/v1');
const { version } = require('./package.json');
const { Logging } = require('@google-cloud/logging');

const instanceId = uuid();
const nodeTcp = `node-tcp v${version} ${instanceId}`;

module.exports = () => {
  return {
    info:  (...args) => writeLogEntry('INFO',  nodeTcp, new Date(), ...args),
    warn:  (...args) => writeLogEntry('WARN',  nodeTcp, new Date(), ...args),
    error: (...args) => writeLogEntry('ERROR', nodeTcp, new Date(), ...args),
  };
};

function writeLogEntry(severity, ...args) {
  if (process.env.NODE_ENV === 'production') {
    const logName = 'projects/tcp-node-server/logs/nodetcp';
    const logging = new Logging({ projectId:'tcp-node-server' });
    const log = logging.log(logName);

    const resource = { type:'gce_instance' };
    const logEntry = log.entry({ resource, severity }, ...args);

    log.write(logEntry);
  } else {
    if (severity === 'INFO') {
      console.info(severity,  ...args);
    } else if(severity === 'WARN') {
      console.warn(severity,  ...args);
    } else {
      console.error(severity, ...args);
    }
  }
}
