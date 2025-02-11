import { isCN } from '@huolala-tech/page-spy-base/dist/utils';

const source = {
  zh: {
    title: '离线日志',
    uploadPeriods: '上传时间段',
    downloadPeriods: '下载时间段',
    readying: '准备数据...',
    ready: '数据已就绪',
    success: '处理成功',
    fail: '处理失败',
    invalid: '无法上传',
    copied: '已复制调试连接',
    selectPeriod: '选择时间段',
    periodDuration: '每段时长',
    remark: '备注',
    remarkPlaceholder: '上传后，可以看到备注信息',
    from: '从',
    to: '到',
    refreshed: '已刷新',
    minutes: '分钟',
    eventCountNotEnough: '时间段内的数据量不足以回放',
    invalidPeriods: '选择的开始时间无效',
    invalidParams: '调用 onOfflineLog() 的参数不正确',
    copyUrl: '复制调试链接',
    copyFailed: '复制失败',
  },
  en: {
    title: 'Offline log',
    uploadPeriods: 'Upload Periods',
    downloadPeriods: 'Download Periods',
    readying: 'Handling...',
    ready: 'Ready',
    success: 'Succeed',
    fail: 'Failed',
    invalid: 'Cannot upload',
    copied: 'Replay url copied',
    selectPeriod: 'Select period',
    periodDuration: 'Each duration',
    remark: 'Remark',
    remarkPlaceholder: 'After uploading, you can view the remark information.',
    from: 'From',
    to: 'To',
    refreshed: 'Refreshed',
    minutes: 'minutes',
    eventCountNotEnough:
      'The data within the time period is insufficient for playback',
    invalidPeriods: 'The start of selected period is invalid',
    invalidParams: 'Incorrect params which you call onOfflineLog()',
    copyUrl: 'Copy URL',
    copyFailed: 'Copy failed',
  },
};

export const t = isCN() ? source.zh : source.en;
