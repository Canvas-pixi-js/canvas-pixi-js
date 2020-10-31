/**設備資料 */
export default new class DeviceInfo {
    constructor() {
        console.log('DeviceInfo Class [For Device] Init');

        /**Nugens 設備參數定義 */
        this.Devices =
        {
            'Doccamera': 'Doccamera (2b19:0200)', // V500S
            'NemoCAM': 'NemoCAM (2b19:0200)',     // V500
            'Nugens VCM200': 'Nugens VCM200 (5d6e:0103)', // VCM200 #New Name
            'HD Camera': '87a81ce370814abb24b99fd72b62127285b62204646cea1c1690ea3edf1c20ce', // VCM200 #Old Name
            'USB Camera': 'USB Camera (0c45:6366)', // VC300
            'USB CAM': 'USB CAM (1bcf:2630)' // V800
        }
        Object.freeze(this.Devices); // 防止被修改

        this.Info =
        {
            /**V500S */
            'Doccamera': {
                resolution: {
                    '1920x1080': { width: 1920, height: 1080 },
                    '1280x720': { width: 1280, height: 720 },
                    '800x600': { width: 800, height: 600 },
                }
            },
            /**V500 */
            'NemoCAM': {
                resolution: {
                    '1920x1080': { width: 1920, height: 1080 },
                    '1280x720': { width: 1280, height: 720 },
                    '800x600': { width: 800, height: 600 },
                }
            },
            /**VCM200 */
            'Nugens VCM200': {
                resolution: {
                    '3840x2160': { width: 3840, height: 2160 },
                    '1920x1080': { width: 1920, height: 1080 },
                    '1280x720': { width: 1280, height: 720 },
                    '800x600': { width: 800, height: 600 },
                }
            },
            /**VCM200 #Old Name */
            'HD Camera': {
                resolution: {
                    '3840x2160': { width: 3840, height: 2160 },
                    '1920x1080': { width: 1920, height: 1080 },
                    '1280x720': { width: 1280, height: 720 },
                    '800x600': { width: 800, height: 600 },
                }
            },
            /**VC300 */
            'USB Camera': {
                resolution: {
                    '1920x1080': { width: 1920, height: 1080 },
                    '1280x720': { width: 1280, height: 720 },
                    '800x600': { width: 800, height: 600 },
                }
            },
            /**V800 */
            'USB CAM': {
                resolution: {
                    '3264x2448': { width: 3264, height: 2448 },
                    '1920x1080': { width: 1920, height: 1080 },
                    '1280x720': { width: 1280, height: 720 },
                    '800x600': { width: 800, height: 600 },
                }
            }
        }
        Object.freeze(this.Info); // 防止被修改

        // 設備解析度
        this.Resolution =
        {
            '1920x1080': { width: 1920, height: 1080 },
            '1280x720': { width: 1280, height: 720 },
            '800x600': { width: 800, height: 600 },
        }
        Object.freeze(this.Resolution); // 防止被修改

        /**視訊設備列表 */
        this.videoList = [];

        /**音訊設備列表 */
        this.audioList = [];

        /**當前視訊設備 */
        this.currentVideo = undefined;

        /**當前音訊設備 */
        this.currentAudio = undefined;
    }
}