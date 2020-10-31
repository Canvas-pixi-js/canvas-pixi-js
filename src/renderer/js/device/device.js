import DeviceInfo from './deviceInfo'
import GL from '../global'

const gl_video = document.createElement('video');
gl_video.setAttribute('id', 'gl_video');

let sourceStream;

/**視訊設備狀態 */
let IsPlaying = false;


/**設備 */
export default class Device {
    constructor(view) {
        console.log('Device Class Init');

        gotDevices((result) => {
            if (result)
                init();
            else
                console.log('Can not find any devices.');
        });

        let reTry = true;
        function init() {
            if (sourceStream) {
                sourceStream.getTracks().forEach(track => {
                    track.stop()
                });
            }

            const constraints = {
                audio: false,
                video: {
                    width: 1920,
                    height: 1080
                }
            };

            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    gotStream(stream);
                })
                // .then(gotDevices)
                .catch((err) => {
                    console.log(err);

                    reTry = false;
                    if (reTry)
                        init();
                });
        };

        function gotStream(mediaStream) {
            // sourceStream = mediaStream;
            gl_video.srcObject = mediaStream;

            gl_video.play().then(() => {
                GL.stream = view.captureStream(30);
                IsPlaying = true;
                reTry = true;
            });
        }

        function gotDevices(callback) {
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                devices.forEach((device) => {
                    // 如果是視訊設備
                    if (device.kind === 'videoinput') {
                        // 檢查是否有符合 Nugens 設備列表 (DeviceEnum) 的設備
                        if (Object.values(DeviceInfo.Devices).includes(device.label)) {
                            const deviceName = device.label.replace(/\(.*\)/, '').trimRight();
                        }
                    }

                    // 如果是音訊設備
                    if (device.kind === 'audioinput') {
                        const deviceName = device.label.replace(/\([0-9].*\)/, '').trimRight();
                    }
                });
            }).then(() => {
                callback(true);
            }).catch((err) => {
                console.log(err.name + ': ' + err.message);
            });
        }
    }
}