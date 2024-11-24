// package: flow.execution
// file: flow/execution/execution.proto

import * as jspb from "google-protobuf";
import * as flow_entities_account_pb from "../../flow/entities/account_pb";
import * as flow_entities_block_header_pb from "../../flow/entities/block_header_pb";
import * as flow_entities_event_pb from "../../flow/entities/event_pb";
import * as flow_entities_transaction_pb from "../../flow/entities/transaction_pb";

export class PingRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingRequest;
  static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
  export type AsObject = {
  }
}

export class PingResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PingResponse): PingResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingResponse;
  static deserializeBinaryFromReader(message: PingResponse, reader: jspb.BinaryReader): PingResponse;
}

export namespace PingResponse {
  export type AsObject = {
  }
}

export class GetAccountAtBlockIDRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  getAddress(): Uint8Array | string;
  getAddress_asU8(): Uint8Array;
  getAddress_asB64(): string;
  setAddress(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountAtBlockIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountAtBlockIDRequest): GetAccountAtBlockIDRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountAtBlockIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountAtBlockIDRequest;
  static deserializeBinaryFromReader(message: GetAccountAtBlockIDRequest, reader: jspb.BinaryReader): GetAccountAtBlockIDRequest;
}

export namespace GetAccountAtBlockIDRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
    address: Uint8Array | string,
  }
}

export class GetAccountAtBlockIDResponse extends jspb.Message {
  hasAccount(): boolean;
  clearAccount(): void;
  getAccount(): flow_entities_account_pb.Account | undefined;
  setAccount(value?: flow_entities_account_pb.Account): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountAtBlockIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountAtBlockIDResponse): GetAccountAtBlockIDResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountAtBlockIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountAtBlockIDResponse;
  static deserializeBinaryFromReader(message: GetAccountAtBlockIDResponse, reader: jspb.BinaryReader): GetAccountAtBlockIDResponse;
}

export namespace GetAccountAtBlockIDResponse {
  export type AsObject = {
    account?: flow_entities_account_pb.Account.AsObject,
  }
}

export class ExecuteScriptAtBlockIDRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  getScript(): Uint8Array | string;
  getScript_asU8(): Uint8Array;
  getScript_asB64(): string;
  setScript(value: Uint8Array | string): void;

  clearArgumentsList(): void;
  getArgumentsList(): Array<Uint8Array | string>;
  getArgumentsList_asU8(): Array<Uint8Array>;
  getArgumentsList_asB64(): Array<string>;
  setArgumentsList(value: Array<Uint8Array | string>): void;
  addArguments(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteScriptAtBlockIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteScriptAtBlockIDRequest): ExecuteScriptAtBlockIDRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecuteScriptAtBlockIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteScriptAtBlockIDRequest;
  static deserializeBinaryFromReader(message: ExecuteScriptAtBlockIDRequest, reader: jspb.BinaryReader): ExecuteScriptAtBlockIDRequest;
}

export namespace ExecuteScriptAtBlockIDRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
    script: Uint8Array | string,
    argumentsList: Array<Uint8Array | string>,
  }
}

export class ExecuteScriptAtBlockIDResponse extends jspb.Message {
  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  getComputationUsage(): number;
  setComputationUsage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteScriptAtBlockIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteScriptAtBlockIDResponse): ExecuteScriptAtBlockIDResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecuteScriptAtBlockIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteScriptAtBlockIDResponse;
  static deserializeBinaryFromReader(message: ExecuteScriptAtBlockIDResponse, reader: jspb.BinaryReader): ExecuteScriptAtBlockIDResponse;
}

export namespace ExecuteScriptAtBlockIDResponse {
  export type AsObject = {
    value: Uint8Array | string,
    computationUsage: number,
  }
}

export class GetEventsForBlockIDsResponse extends jspb.Message {
  clearResultsList(): void;
  getResultsList(): Array<GetEventsForBlockIDsResponse.Result>;
  setResultsList(value: Array<GetEventsForBlockIDsResponse.Result>): void;
  addResults(value?: GetEventsForBlockIDsResponse.Result, index?: number): GetEventsForBlockIDsResponse.Result;

  getEventEncodingVersion(): flow_entities_event_pb.EventEncodingVersionMap[keyof flow_entities_event_pb.EventEncodingVersionMap];
  setEventEncodingVersion(value: flow_entities_event_pb.EventEncodingVersionMap[keyof flow_entities_event_pb.EventEncodingVersionMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetEventsForBlockIDsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetEventsForBlockIDsResponse): GetEventsForBlockIDsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetEventsForBlockIDsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetEventsForBlockIDsResponse;
  static deserializeBinaryFromReader(message: GetEventsForBlockIDsResponse, reader: jspb.BinaryReader): GetEventsForBlockIDsResponse;
}

export namespace GetEventsForBlockIDsResponse {
  export type AsObject = {
    resultsList: Array<GetEventsForBlockIDsResponse.Result.AsObject>,
    eventEncodingVersion: flow_entities_event_pb.EventEncodingVersionMap[keyof flow_entities_event_pb.EventEncodingVersionMap],
  }

  export class Result extends jspb.Message {
    getBlockId(): Uint8Array | string;
    getBlockId_asU8(): Uint8Array;
    getBlockId_asB64(): string;
    setBlockId(value: Uint8Array | string): void;

    getBlockHeight(): number;
    setBlockHeight(value: number): void;

    clearEventsList(): void;
    getEventsList(): Array<flow_entities_event_pb.Event>;
    setEventsList(value: Array<flow_entities_event_pb.Event>): void;
    addEvents(value?: flow_entities_event_pb.Event, index?: number): flow_entities_event_pb.Event;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Result.AsObject;
    static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Result;
    static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
  }

  export namespace Result {
    export type AsObject = {
      blockId: Uint8Array | string,
      blockHeight: number,
      eventsList: Array<flow_entities_event_pb.Event.AsObject>,
    }
  }
}

export class GetEventsForBlockIDsRequest extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  clearBlockIdsList(): void;
  getBlockIdsList(): Array<Uint8Array | string>;
  getBlockIdsList_asU8(): Array<Uint8Array>;
  getBlockIdsList_asB64(): Array<string>;
  setBlockIdsList(value: Array<Uint8Array | string>): void;
  addBlockIds(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetEventsForBlockIDsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetEventsForBlockIDsRequest): GetEventsForBlockIDsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetEventsForBlockIDsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetEventsForBlockIDsRequest;
  static deserializeBinaryFromReader(message: GetEventsForBlockIDsRequest, reader: jspb.BinaryReader): GetEventsForBlockIDsRequest;
}

export namespace GetEventsForBlockIDsRequest {
  export type AsObject = {
    type: string,
    blockIdsList: Array<Uint8Array | string>,
  }
}

export class GetTransactionResultRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  getTransactionId(): Uint8Array | string;
  getTransactionId_asU8(): Uint8Array;
  getTransactionId_asB64(): string;
  setTransactionId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionResultRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionResultRequest): GetTransactionResultRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionResultRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionResultRequest;
  static deserializeBinaryFromReader(message: GetTransactionResultRequest, reader: jspb.BinaryReader): GetTransactionResultRequest;
}

export namespace GetTransactionResultRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
    transactionId: Uint8Array | string,
  }
}

export class GetTransactionByIndexRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  getIndex(): number;
  setIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionByIndexRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionByIndexRequest): GetTransactionByIndexRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionByIndexRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionByIndexRequest;
  static deserializeBinaryFromReader(message: GetTransactionByIndexRequest, reader: jspb.BinaryReader): GetTransactionByIndexRequest;
}

export namespace GetTransactionByIndexRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
    index: number,
  }
}

export class GetTransactionResultResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  getErrorMessage(): string;
  setErrorMessage(value: string): void;

  clearEventsList(): void;
  getEventsList(): Array<flow_entities_event_pb.Event>;
  setEventsList(value: Array<flow_entities_event_pb.Event>): void;
  addEvents(value?: flow_entities_event_pb.Event, index?: number): flow_entities_event_pb.Event;

  getEventEncodingVersion(): flow_entities_event_pb.EventEncodingVersionMap[keyof flow_entities_event_pb.EventEncodingVersionMap];
  setEventEncodingVersion(value: flow_entities_event_pb.EventEncodingVersionMap[keyof flow_entities_event_pb.EventEncodingVersionMap]): void;

  getComputationUsage(): number;
  setComputationUsage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionResultResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionResultResponse): GetTransactionResultResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionResultResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionResultResponse;
  static deserializeBinaryFromReader(message: GetTransactionResultResponse, reader: jspb.BinaryReader): GetTransactionResultResponse;
}

export namespace GetTransactionResultResponse {
  export type AsObject = {
    statusCode: number,
    errorMessage: string,
    eventsList: Array<flow_entities_event_pb.Event.AsObject>,
    eventEncodingVersion: flow_entities_event_pb.EventEncodingVersionMap[keyof flow_entities_event_pb.EventEncodingVersionMap],
    computationUsage: number,
  }
}

export class GetTransactionsByBlockIDRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionsByBlockIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionsByBlockIDRequest): GetTransactionsByBlockIDRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionsByBlockIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionsByBlockIDRequest;
  static deserializeBinaryFromReader(message: GetTransactionsByBlockIDRequest, reader: jspb.BinaryReader): GetTransactionsByBlockIDRequest;
}

export namespace GetTransactionsByBlockIDRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
  }
}

export class GetTransactionResultsResponse extends jspb.Message {
  clearTransactionResultsList(): void;
  getTransactionResultsList(): Array<GetTransactionResultResponse>;
  setTransactionResultsList(value: Array<GetTransactionResultResponse>): void;
  addTransactionResults(value?: GetTransactionResultResponse, index?: number): GetTransactionResultResponse;

  getEventEncodingVersion(): flow_entities_event_pb.EventEncodingVersionMap[keyof flow_entities_event_pb.EventEncodingVersionMap];
  setEventEncodingVersion(value: flow_entities_event_pb.EventEncodingVersionMap[keyof flow_entities_event_pb.EventEncodingVersionMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionResultsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionResultsResponse): GetTransactionResultsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionResultsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionResultsResponse;
  static deserializeBinaryFromReader(message: GetTransactionResultsResponse, reader: jspb.BinaryReader): GetTransactionResultsResponse;
}

export namespace GetTransactionResultsResponse {
  export type AsObject = {
    transactionResultsList: Array<GetTransactionResultResponse.AsObject>,
    eventEncodingVersion: flow_entities_event_pb.EventEncodingVersionMap[keyof flow_entities_event_pb.EventEncodingVersionMap],
  }
}

export class GetTransactionErrorMessageRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  getTransactionId(): Uint8Array | string;
  getTransactionId_asU8(): Uint8Array;
  getTransactionId_asB64(): string;
  setTransactionId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionErrorMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionErrorMessageRequest): GetTransactionErrorMessageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionErrorMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionErrorMessageRequest;
  static deserializeBinaryFromReader(message: GetTransactionErrorMessageRequest, reader: jspb.BinaryReader): GetTransactionErrorMessageRequest;
}

export namespace GetTransactionErrorMessageRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
    transactionId: Uint8Array | string,
  }
}

export class GetTransactionErrorMessageByIndexRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  getIndex(): number;
  setIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionErrorMessageByIndexRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionErrorMessageByIndexRequest): GetTransactionErrorMessageByIndexRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionErrorMessageByIndexRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionErrorMessageByIndexRequest;
  static deserializeBinaryFromReader(message: GetTransactionErrorMessageByIndexRequest, reader: jspb.BinaryReader): GetTransactionErrorMessageByIndexRequest;
}

export namespace GetTransactionErrorMessageByIndexRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
    index: number,
  }
}

export class GetTransactionErrorMessageResponse extends jspb.Message {
  getTransactionId(): Uint8Array | string;
  getTransactionId_asU8(): Uint8Array;
  getTransactionId_asB64(): string;
  setTransactionId(value: Uint8Array | string): void;

  getErrorMessage(): string;
  setErrorMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionErrorMessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionErrorMessageResponse): GetTransactionErrorMessageResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionErrorMessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionErrorMessageResponse;
  static deserializeBinaryFromReader(message: GetTransactionErrorMessageResponse, reader: jspb.BinaryReader): GetTransactionErrorMessageResponse;
}

export namespace GetTransactionErrorMessageResponse {
  export type AsObject = {
    transactionId: Uint8Array | string,
    errorMessage: string,
  }
}

export class GetTransactionErrorMessagesByBlockIDRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionErrorMessagesByBlockIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionErrorMessagesByBlockIDRequest): GetTransactionErrorMessagesByBlockIDRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionErrorMessagesByBlockIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionErrorMessagesByBlockIDRequest;
  static deserializeBinaryFromReader(message: GetTransactionErrorMessagesByBlockIDRequest, reader: jspb.BinaryReader): GetTransactionErrorMessagesByBlockIDRequest;
}

export namespace GetTransactionErrorMessagesByBlockIDRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
  }
}

export class GetTransactionErrorMessagesResponse extends jspb.Message {
  clearResultsList(): void;
  getResultsList(): Array<GetTransactionErrorMessagesResponse.Result>;
  setResultsList(value: Array<GetTransactionErrorMessagesResponse.Result>): void;
  addResults(value?: GetTransactionErrorMessagesResponse.Result, index?: number): GetTransactionErrorMessagesResponse.Result;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionErrorMessagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionErrorMessagesResponse): GetTransactionErrorMessagesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionErrorMessagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionErrorMessagesResponse;
  static deserializeBinaryFromReader(message: GetTransactionErrorMessagesResponse, reader: jspb.BinaryReader): GetTransactionErrorMessagesResponse;
}

export namespace GetTransactionErrorMessagesResponse {
  export type AsObject = {
    resultsList: Array<GetTransactionErrorMessagesResponse.Result.AsObject>,
  }

  export class Result extends jspb.Message {
    getTransactionId(): Uint8Array | string;
    getTransactionId_asU8(): Uint8Array;
    getTransactionId_asB64(): string;
    setTransactionId(value: Uint8Array | string): void;

    getIndex(): number;
    setIndex(value: number): void;

    getErrorMessage(): string;
    setErrorMessage(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Result.AsObject;
    static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Result;
    static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
  }

  export namespace Result {
    export type AsObject = {
      transactionId: Uint8Array | string,
      index: number,
      errorMessage: string,
    }
  }
}

export class GetRegisterAtBlockIDRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  getRegisterOwner(): Uint8Array | string;
  getRegisterOwner_asU8(): Uint8Array;
  getRegisterOwner_asB64(): string;
  setRegisterOwner(value: Uint8Array | string): void;

  getRegisterKey(): Uint8Array | string;
  getRegisterKey_asU8(): Uint8Array;
  getRegisterKey_asB64(): string;
  setRegisterKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRegisterAtBlockIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRegisterAtBlockIDRequest): GetRegisterAtBlockIDRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetRegisterAtBlockIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRegisterAtBlockIDRequest;
  static deserializeBinaryFromReader(message: GetRegisterAtBlockIDRequest, reader: jspb.BinaryReader): GetRegisterAtBlockIDRequest;
}

export namespace GetRegisterAtBlockIDRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
    registerOwner: Uint8Array | string,
    registerKey: Uint8Array | string,
  }
}

export class GetRegisterAtBlockIDResponse extends jspb.Message {
  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRegisterAtBlockIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRegisterAtBlockIDResponse): GetRegisterAtBlockIDResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetRegisterAtBlockIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRegisterAtBlockIDResponse;
  static deserializeBinaryFromReader(message: GetRegisterAtBlockIDResponse, reader: jspb.BinaryReader): GetRegisterAtBlockIDResponse;
}

export namespace GetRegisterAtBlockIDResponse {
  export type AsObject = {
    value: Uint8Array | string,
  }
}

export class GetLatestBlockHeaderRequest extends jspb.Message {
  getIsSealed(): boolean;
  setIsSealed(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLatestBlockHeaderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLatestBlockHeaderRequest): GetLatestBlockHeaderRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLatestBlockHeaderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLatestBlockHeaderRequest;
  static deserializeBinaryFromReader(message: GetLatestBlockHeaderRequest, reader: jspb.BinaryReader): GetLatestBlockHeaderRequest;
}

export namespace GetLatestBlockHeaderRequest {
  export type AsObject = {
    isSealed: boolean,
  }
}

export class GetBlockHeaderByIDRequest extends jspb.Message {
  getId(): Uint8Array | string;
  getId_asU8(): Uint8Array;
  getId_asB64(): string;
  setId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlockHeaderByIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBlockHeaderByIDRequest): GetBlockHeaderByIDRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBlockHeaderByIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBlockHeaderByIDRequest;
  static deserializeBinaryFromReader(message: GetBlockHeaderByIDRequest, reader: jspb.BinaryReader): GetBlockHeaderByIDRequest;
}

export namespace GetBlockHeaderByIDRequest {
  export type AsObject = {
    id: Uint8Array | string,
  }
}

export class BlockHeaderResponse extends jspb.Message {
  hasBlock(): boolean;
  clearBlock(): void;
  getBlock(): flow_entities_block_header_pb.BlockHeader | undefined;
  setBlock(value?: flow_entities_block_header_pb.BlockHeader): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockHeaderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BlockHeaderResponse): BlockHeaderResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockHeaderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockHeaderResponse;
  static deserializeBinaryFromReader(message: BlockHeaderResponse, reader: jspb.BinaryReader): BlockHeaderResponse;
}

export namespace BlockHeaderResponse {
  export type AsObject = {
    block?: flow_entities_block_header_pb.BlockHeader.AsObject,
  }
}

