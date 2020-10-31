import GL from './global.js'

export default class Media {
    constructor() {
        console.log('Media Class Init');
        this.blobs = [];
        this.mediaRecorder = { state: 'inactive' };

        btn_start.addEventListener('click', () => this.start());
        btn_pause.addEventListener('click', () => this.pause());
        btn_resume.addEventListener('click', () => this.resume());
        btn_stop.addEventListener('click', () => this.stop());
    }

    start() {
        const options = {
            mimeType: 'video/webm; codecs=h264',
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 8000000
        };

        console.log(GL.stream);

        this.mediaRecorder = new MediaRecorder(GL.stream, options);

        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                this.blobs.push(event.data);
            }
        }

        this.mediaRecorder.start(1000);
    }

    pause() {
        this.mediaRecorder.pause();
    }

    resume() {
        this.mediaRecorder.resume();
    }

    async stop() {
        this.mediaRecorder.stop();
        console.log(this.blobs);

        const fs = require('fs');
        const writeStream = fs.createWriteStream('test.webm');
        const blob = new Blob(this.blobs, { type: 'video/webm' });
        const arrayBuffer = await blob.arrayBuffer();
        const array = new Uint8Array(arrayBuffer);
        const buffer = Buffer.from(array);
        let readStream = bufferToStream(buffer);
        readStream.pipe(writeStream);

        this.blobs = [];
    }
}

function bufferToStream(buffer) {
    let { Readable } = require('stream');
    let stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}