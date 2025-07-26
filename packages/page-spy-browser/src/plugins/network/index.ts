// eslint-disable no-case-declarations
import type { OnInitParams, PageSpyPlugin } from '@huolala-tech/page-spy-types';
import { NetworkProxyBase } from '@huolala-tech/page-spy-base';
import XhrProxy from './proxy/xhr-proxy';
import FetchProxy from './proxy/fetch-proxy';
import BeaconProxy from './proxy/beacon-proxy';
import { InitConfig } from '../../config';
import { ResourceCollector } from './proxy/resource-collector';

export default class NetworkPlugin implements PageSpyPlugin {
  public name = 'NetworkPlugin';

  public xhrProxy: XhrProxy | null = null;

  public fetchProxy: FetchProxy | null = null;

  public beaconProxy: BeaconProxy | null = null;

  public resourceCollector: ResourceCollector | null = null;

  public static hasInitd = false;

  public onInit({ config }: OnInitParams<InitConfig>) {
    if (NetworkPlugin.hasInitd) return;
    NetworkPlugin.hasInitd = true;
    NetworkProxyBase.dataProcessor = config.dataProcessor.network;

    this.xhrProxy = new XhrProxy();
    this.fetchProxy = new FetchProxy();
    this.beaconProxy = new BeaconProxy();
    this.resourceCollector = new ResourceCollector();
  }

  public onReset() {
    this.xhrProxy?.reset();
    this.fetchProxy?.reset();
    this.beaconProxy?.reset();
    this.resourceCollector?.reset();
    NetworkPlugin.hasInitd = false;
  }
}
