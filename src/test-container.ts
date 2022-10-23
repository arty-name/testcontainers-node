import { PortWithOptionalBinding } from "./port";
import { PullPolicy } from "./pull-policy";
import { WaitStrategy } from "./wait-strategy";
import { Readable } from "stream";
import { BindMode, ExecResult, ExtraHost, TmpFs, Labels, Ulimits } from "./docker/types";

export interface TestContainer {
  start(): Promise<StartedTestContainer>;

  withEnvironment(key: string, value: string): this;

  withCommand(command: string[]): this;

  withEntrypoint(entrypoint: string[]): this;

  withTmpFs(tmpFs: TmpFs): this;

  withUlimits(ulimits: Ulimits): this;

  withAddedCapabilities(...capabilities: string[]): this;

  withDroppedCapabilities(...capabilities: string[]): this;

  withExposedPorts(...ports: PortWithOptionalBinding[]): this;

  withBindMount(source: string, target: string, bindMode: BindMode): this;

  withWaitStrategy(waitStrategy: WaitStrategy): this;

  withStartupTimeout(startupTimeout: number): this;

  withNetworkMode(networkMode: string): this;

  withExtraHosts(...extraHosts: ExtraHost[]): this;

  withDefaultLogDriver(): this;

  withPrivilegedMode(): this;

  withUser(user: string): this;

  withPullPolicy(pullPolicy: PullPolicy): this;

  withReuse(): this;

  withCopyFileToContainer(sourcePath: string, containerPath: string): this;

  withCopyContentToContainer(content: string | Buffer | Readable, containerPath: string): this;
}

export interface RestartOptions {
  timeout: number;
}

export interface StopOptions {
  timeout: number;
  removeVolumes: boolean;
}

export interface DockerComposeDownOptions {
  timeout: number;
  removeVolumes: boolean;
}

export interface ExecOptions {
  tty: boolean;
  detach: boolean;
  stdin: boolean;
}

export interface StartedTestContainer {
  stop(options?: Partial<StopOptions>): Promise<StoppedTestContainer>;

  restart(options?: Partial<RestartOptions>): Promise<void>;

  getHost(): string;

  getMappedPort(port: number): number;

  getName(): string;

  getLabels(): Labels;

  getId(): string;

  getNetworkNames(): string[];

  getNetworkId(networkName: string): string;

  getIpAddress(networkName: string): string;

  exec(command: string[], options?: Partial<ExecOptions>): Promise<ExecResult>;

  logs(): Promise<Readable>;
}

export interface StoppedTestContainer {}
