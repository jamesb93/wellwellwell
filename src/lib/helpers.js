import RNBO from '@rnbo/js';

const sendDeviceMessage = (device, tag, message) => {
    try {
        device.scheduleEvent(new RNBO.MessageEvent(RNBO.TimeNow, tag, message));
    } catch (e) {
        throw new Error('RNBO device likely is invalid or has not been loaded yet');
    }
};

const createDeviceInstance = (devicePath, context, output) => {
    return new Promise((resolve, reject) => {
        fetch(devicePath)
            .then(response => response.json())
            .then(response => {
                const patcher = response;
                return RNBO.createDevice({ context, patcher });
            })
            .then(device => {
                device.node.connect(output);
                device.messageEvent.subscribe(e => {
                    if (e.tag.includes('debug')) {
                        console.log(e.tag, e.payload);
                    }
                });
                if (device) {
                    resolve(device);
                } else {
                    reject('Error');
                }
            });
    });
};

export { sendDeviceMessage, createDeviceInstance };